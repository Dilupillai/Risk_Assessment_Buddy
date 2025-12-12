/**
 * Generates a standalone shareable HTML file with the risk assessment table
 * @param {Object} imageNameMap - Map of image IDs to filenames
 * @returns {Promise<string>} Complete HTML document as string
 */
async function generateShareableHTML(imageNameMap) {
    const tableContainer = document.getElementById('table-container');
    if (!tableContainer) return '';
    
    const rows = tableContainer.querySelectorAll('tbody tr:not(.deleted-row):not([data-deleted="true"])');
    if (rows.length === 0) return '';
    
    // Get headers (excluding AI, Delete columns for clean output)
    const headers = Array.from(document.querySelectorAll('#table-container thead th'))
        .map(th => th.textContent.trim())
        .filter(h => h !== 'AI' && h !== 'Delete');
    
    // Collect row data with images
    const tableData = [];
    
    // First, convert all images to base64 with compression
    const imagePromises = [];
    const imageBase64Map = new Map();
    
    rows.forEach((row, idx) => {
        const img = row.querySelector('img');
        if (img && img.src) {
            const imgId = row.dataset.imageId;
            const promise = fetch(img.src)
                .then(res => res.blob())
                .then(blob => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => {
                            // Create canvas for compression
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            
                            // Calculate new dimensions (max 800px width/height for smaller size)
                            const maxSize = 800;
                            let width = img.width;
                            let height = img.height;
                            
                            if (width > maxSize || height > maxSize) {
                                if (width > height) {
                                    height = (height / width) * maxSize;
                                    width = maxSize;
                                } else {
                                    width = (width / height) * maxSize;
                                    height = maxSize;
                                }
                            }
                            
                            canvas.width = width;
                            canvas.height = height;
                            
                            // Draw and compress (0.6 quality = smaller file size)
                            ctx.drawImage(img, 0, 0, width, height);
                            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
                            
                            imageBase64Map.set(idx, compressedBase64);
                            resolve();
                        };
                        img.onerror = () => {
                            console.warn(`Failed to load image ${idx}`);
                            resolve();
                        };
                        img.src = URL.createObjectURL(blob);
                    });
                })
                .catch(err => {
                    console.warn(`Failed to convert image ${idx} to base64:`, err);
                });
            imagePromises.push(promise);
        }
    });
    
    // Wait for all images to be converted
    await Promise.all(imagePromises);
    
    rows.forEach((row, idx) => {
        const cells = row.querySelectorAll('td');
        const rowData = { index: idx + 1 };
        
        // Get image data (now as base64)
        const img = row.querySelector('img');
        if (img && img.src) {
            const imgId = row.dataset.imageId;
            rowData.imageUrl = imageBase64Map.get(idx) || img.src;
            rowData.imageName = imageNameMap.get(imgId) || `image_${idx + 1}.jpg`;
        }
        
        // Get cell values
        const headersList = Array.from(document.querySelectorAll('#table-container thead th')).map(th => th.textContent.trim());
        headersList.forEach((header, i) => {
            if (header === 'AI' || header === 'Delete') return;
            const cell = cells[i];
            if (!cell) return;
            
            if (header === 'Picture') {
                rowData[header] = rowData.imageUrl || '';
            } else {
                const select = cell.querySelector('select');
                const input = cell.querySelector('input');
                if (select) {
                    rowData[header] = select.options[select.selectedIndex]?.text || select.value;
                } else if (input) {
                    rowData[header] = input.value;
                } else {
                    rowData[header] = cell.textContent.trim();
                }
            }
        });
        
        tableData.push(rowData);
    });
    
    // Calculate risk category distribution
    const riskDistribution = {};
    tableData.forEach(row => {
        const cat = row['Risk Category'] || 'Unknown';
        riskDistribution[cat] = (riskDistribution[cat] || 0) + 1;
    });
    
    // Generate complete standalone HTML
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Risk Assessment Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .risk-critical { background-color: #fee2e2; color: #991b1b; font-weight: 600; }
        .risk-high { background-color: #ffedd5; color: #9a3412; font-weight: 600; }
        .risk-medium { background-color: #fef9c3; color: #854d0e; font-weight: 600; }
        .risk-low { background-color: #dcfce7; color: #166534; font-weight: 600; }
        .table-img { width: 60px; height: 60px; object-fit: cover; border-radius: 8px; cursor: pointer; transition: transform 0.2s; }
        .table-img:hover { transform: scale(1.1); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center; padding: 20px; }
        .modal-overlay.active { display: flex; }
        .modal-content { background: white; border-radius: 16px; max-width: 1100px; width: 100%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; }
        .modal-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .modal-body { display: flex; flex: 1; overflow: hidden; }
        .modal-image { width: 50%; padding: 20px; display: flex; align-items: center; justify-content: center; background: #f8fafc; }
        .modal-image img { max-width: 100%; max-height: 60vh; object-fit: contain; border-radius: 8px; }
        .modal-details { width: 50%; padding: 20px; overflow-y: auto; }
        .detail-row { margin-bottom: 12px; }
        .detail-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.5px; }
        .detail-value { font-size: 14px; color: #1e293b; padding: 8px 12px; background: #f8fafc; border-radius: 6px; margin-top: 4px; }
        .close-btn { width: 32px; height: 32px; border-radius: 50%; border: none; background: #f1f5f9; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; }
        .close-btn:hover { background: #e2e8f0; }
        @media print { .modal-overlay { display: none !important; } .no-print { display: none !important; } }
        table { border-collapse: collapse; width: 100%; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); }
        th, td { border: 1px solid #e2e8f0; padding: 10px 14px; text-align: left; font-size: 13px; }
        th { background: linear-gradient(to bottom, #f8fafc, #f1f5f9); font-weight: 700; position: sticky; top: 0; z-index: 10; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; color: #475569; border-bottom: 2px solid #cbd5e1; }
        tr:hover { background: #f8fafc; }
        tbody tr { transition: background-color 0.15s ease; }
        .nav-btn { padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; }
        .nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .risk-critical, .risk-high, .risk-medium, .risk-low { 
            padding: 6px 12px; 
            border-radius: 6px; 
            display: inline-block;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body class="bg-slate-100 min-h-screen">
    <div class="max-w-[95%] mx-auto py-8">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-bold">📋 Risk Assessment Report</h1>
                        <p class="text-indigo-200 mt-1">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <button onclick="window.print()" class="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition no-print">
                        🖨️ Print
                    </button>
                </div>
            </div>
            
            <!-- Risk Category Distribution Chart -->
            <div class="p-8 border-b border-gray-200 no-print bg-gradient-to-br from-slate-50 to-blue-50">
                <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span class="text-2xl">📊</span> 
                    <span>Risk Category Distribution</span>
                </h2>
                <div id="pieChart" style="width: 100%; height: 450px; border-radius: 12px; background: white; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"></div>
            </div>
            <div class="p-6 overflow-x-auto">
                <div class="mb-5 no-print flex items-center gap-3">
                    <button onclick="filterTableByCategory('All')" class="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2.5 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all font-semibold shadow-md hover:shadow-lg">
                        🔄 Show All Tasks
                    </button>
                    <span class="text-sm text-gray-600 italic">💡 Click on the pie chart to filter by risk category</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            ${headers.map(h => `<th>${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        ${tableData.map((row, idx) => {
                            const riskCat = (row['Risk Category'] || '').toLowerCase();
                            let riskClass = '';
                            if (riskCat.includes('critical')) riskClass = 'risk-critical';
                            else if (riskCat.includes('high')) riskClass = 'risk-high';
                            else if (riskCat.includes('medium')) riskClass = 'risk-medium';
                            else if (riskCat.includes('low')) riskClass = 'risk-low';
                            
                            return `<tr>
                                ${headers.map(h => {
                                    if (h === 'Picture') {
                                        if (row.imageUrl) {
                                            return `<td><img src="${row.imageUrl}" class="table-img" onclick="openModal(${idx})" alt="Task image"></td>`;
                                        }
                                        return '<td class="text-center text-slate-400">—</td>';
                                    }
                                    if (h === 'Risk Category') {
                                        return `<td><span class="px-2 py-1 rounded text-xs font-semibold ${riskClass}">${row[h] || '—'}</span></td>`;
                                    }
                                    return `<td>${row[h] || '—'}</td>`;
                                }).join('')}
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            <div class="p-4 bg-slate-50 border-t border-slate-200 text-center text-sm text-slate-500 no-print">
                <p>💡 Click on any image to view task details • Total Tasks: <strong>${tableData.length}</strong></p>
            </div>
        </div>
    </div>

    <div id="taskModal" class="modal-overlay" onclick="if(event.target === this) closeModal()">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle" class="text-lg font-bold text-slate-800">Task Details</h2>
                <button class="close-btn" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img id="modalImage" src="" alt="Task image">
                </div>
                <div class="modal-details" id="modalDetails"></div>
            </div>
            <div class="p-4 border-t border-slate-200 flex justify-between items-center">
                <button id="prevBtn" onclick="navigateTask(-1)" class="nav-btn bg-slate-200 text-slate-700 hover:bg-slate-300">← Previous</button>
                <span id="taskCounter" class="text-slate-600 font-medium">1 / ${tableData.length}</span>
                <button id="nextBtn" onclick="navigateTask(1)" class="nav-btn bg-indigo-600 text-white hover:bg-indigo-700">Next →</button>
            </div>
        </div>
    </div>

    <script>
        const tableData = ${JSON.stringify(tableData)};
        const displayFields = ${JSON.stringify(headers.filter(h => h !== 'Picture'))};
        let currentIndex = 0;
        
        function openModal(index) {
            currentIndex = index;
            showTask(index);
            document.getElementById('taskModal').classList.add('active');
        }
        
        function showTask(index) {
            const data = tableData[index];
            if (!data) return;
            
            document.getElementById('modalTitle').textContent = 'Task ' + (index + 1) + ': ' + (data['Steps'] || 'Untitled');
            
            const imgEl = document.getElementById('modalImage');
            if (data.imageUrl) {
                imgEl.src = data.imageUrl;
                imgEl.style.display = 'block';
            } else {
                imgEl.style.display = 'none';
            }
            
            let detailsHtml = '';
            displayFields.forEach(function(field) {
                const value = data[field] || '—';
                let valueClass = '';
                if (field === 'Risk Category') {
                    const cat = value.toLowerCase();
                    if (cat.includes('critical')) valueClass = 'risk-critical';
                    else if (cat.includes('high')) valueClass = 'risk-high';
                    else if (cat.includes('medium')) valueClass = 'risk-medium';
                    else if (cat.includes('low')) valueClass = 'risk-low';
                }
                detailsHtml += '<div class="detail-row">' +
                    '<div class="detail-label">' + field + '</div>' +
                    '<div class="detail-value ' + valueClass + '">' + value + '</div>' +
                '</div>';
            });
            
            document.getElementById('modalDetails').innerHTML = detailsHtml;
            document.getElementById('taskCounter').textContent = (index + 1) + ' / ' + tableData.length;
            document.getElementById('prevBtn').disabled = index === 0;
            document.getElementById('nextBtn').disabled = index === tableData.length - 1;
        }
        
        function navigateTask(direction) {
            const newIndex = currentIndex + direction;
            if (newIndex >= 0 && newIndex < tableData.length) {
                currentIndex = newIndex;
                showTask(currentIndex);
            }
        }
        
        function closeModal() {
            document.getElementById('taskModal').classList.remove('active');
        }
        
        document.addEventListener('keydown', function(e) {
            if (!document.getElementById('taskModal').classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateTask(-1);
            if (e.key === 'ArrowRight') navigateTask(1);
        });
        
        // Data for filtering
        const fullData = tableData.slice();
        let filteredData = tableData.slice();
        
        // Color map matching main app
        const colorMap = { 'CRITICAL': '#dc2626', 'HIGH': '#f97316', 'MEDIUM': '#eab308', 'LOW': '#16a34a' };
        
        function drawChart() {
            const distribution = {};
            
            // Count risk categories
            filteredData.forEach(row => {
                const cat = (row['Risk Category'] || 'Unknown').toUpperCase();
                distribution[cat] = (distribution[cat] || 0) + 1;
            });
            
            // Sort categories: Low -> Medium -> High -> Critical
            const categoryOrder = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
            const orderedDistribution = {};
            categoryOrder.forEach(cat => {
                if (distribution[cat]) {
                    orderedDistribution[cat] = distribution[cat];
                }
            });
            
            const chartData = [['Risk Category', 'Count']];
            Object.keys(orderedDistribution).forEach(key => {
                chartData.push([key, orderedDistribution[key]]);
            });
            
            const data = google.visualization.arrayToDataTable(chartData);
            
            const colors = categoryOrder.map(cat => colorMap[cat]);
            const options = {
                title: 'Risk Category Distribution (Click to filter)',
                titleTextStyle: { fontSize: 16, bold: true, color: '#334155' },
                pieHole: 0.4,
                colors: colors,
                chartArea: {width: '90%', height: '85%'},
                legend: {position: 'right', textStyle: {fontSize: 14, bold: true}, alignment: 'center'},
                pieSliceText: 'value',
                pieSliceTextStyle: {fontSize: 15, bold: true, color: '#fff'},
                tooltip: { text: 'both', textStyle: {fontSize: 13} },
                backgroundColor: 'transparent',
                sliceVisibilityThreshold: 0,
                animation: {
                    startup: true,
                    duration: 800,
                    easing: 'out'
                }
            };
            
            const chart = new google.visualization.PieChart(document.getElementById('pieChart'));
            
            google.visualization.events.addListener(chart, 'select', function() {
                const selection = chart.getSelection();
                if (selection.length > 0) {
                    const selectedCategory = chartData[selection[0].row + 1][0];
                    filterTableByCategory(selectedCategory);
                }
            });
            
            chart.draw(data, options);
        }
        
        function filterTableByCategory(category) {
            const tbody = document.getElementById('tableBody');
            const rows = tbody.querySelectorAll('tr');
            
            if (category === 'All') {
                filteredData = fullData.slice();
                rows.forEach(row => row.style.display = '');
            } else {
                // Match category to original (case-insensitive)
                const categoryUpper = category.toUpperCase();
                filteredData = fullData.filter(row => {
                    const rowCat = (row['Risk Category'] || '').toUpperCase();
                    return rowCat === categoryUpper;
                });
                
                rows.forEach((row, idx) => {
                    const rowCategory = (fullData[idx]['Risk Category'] || '').toUpperCase();
                    row.style.display = rowCategory === categoryUpper ? '' : 'none';
                });
            }
            
            // Redraw chart to update displayed categories
            drawChart();
        }
        
        // Initialize Google Charts
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
    </script>
</body>
</html>`;
}

// Make it available globally
window.generateShareableHTML = generateShareableHTML;
