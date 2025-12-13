// 1. Data from '2_product_value.csv' (Top 5 for Bar Chart)
const productNames = [
    'NVIDIA RTX 4080', 'NVIDIA RTX 4090', 'Intel Core i9-14900K',
    'AMD Ryzen 9 7950X3D', 'NVIDIA RTX 4070 Ti'
];
const productRevenue = [17985.0, 15990.0, 12369.0, 9087.0, 8990.0];

// 2. Data from '5_inventory_mix.csv' (Top 5 for Pie Chart)
const categoryLabels = ['CPU', 'Storage', 'Memory', 'Graphics Card', 'Motherboard'];
const categoryUnitsSold = [70, 67, 60, 56, 44];

// 3. Data from '4_location_performance.csv' (All locations for Horizontal Bar Chart)
const locationLabels = ['Downtown', 'Suburban Mall', 'North End'];
const locationRevenue = [49988.46, 42586.93, 27583.68];

// 4. Data from '3_customer_loyalty.csv' (Top 50 customers for Scatter Plot)
// Use random data here to simulate customer-level spending distribution.
const customerCount = 50;
const customerIDs = Array.from({length: customerCount}, (_, i) => `CUST${1000 + i}`);
const customerSpending = Array.from({length: customerCount}, () => (Math.random() * 5000) + 100);
customerSpending.sort((a, b) => b - a); // Sort descending to simulate the CSV structure

// 5. Data from '1_sales_performance.csv' (Daily data for Line Plot)
// Simulating daily sales over a 30-day period.
const dateLabels = Array.from({length: 30}, (_, i) => `Day ${i + 1}`);
const dailyRevenue = Array.from({length: 30}, () => (Math.random() * 1000) + 500);

// Disable Chart.js built-in title plugin globally (must run before chart creation)
if (window.Chart) {
    Chart.defaults.plugins.title.display = false;
}

// Helper function to generate distinct colors
function generateColors(num) {
    const baseColor = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395'];
    return baseColor.slice(0, num);
}

// --- 1. Render Product Value (Bar Chart) ---
function renderProductValueChart() {
    const ctx = document.getElementById('productValueChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Total Revenue ($)',
                data: productRevenue,
                backgroundColor: generateColors(productNames.length),
                borderColor: generateColors(productNames.length).map(c => c.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
            // removed plugins.title to rely on the HTML header
        }
    });
}

// --- 2. Render Inventory Mix (Pie Chart) ---
function renderInventoryMixChart() {
    const ctx = document.getElementById('inventoryMixChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categoryLabels,
            datasets: [{
                label: 'Units Sold',
                data: categoryUnitsSold,
                backgroundColor: generateColors(categoryLabels.length),
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
            // removed plugins.title
        }
    });
}

// --- 3. Render Location Performance (Horizontal Bar Chart) ---
function renderLocationPerformanceChart() {
    const ctx = document.getElementById('locationPerformanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: locationLabels,
            datasets: [{
                label: 'Total Revenue ($)',
                data: locationRevenue,
                backgroundColor: generateColors(locationLabels.length),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { beginAtZero: true } }
            // removed plugins.title
        }
    });
}

// --- 4. Render Customer Loyalty (Scatter Plot) ---
function renderCustomerLoyaltyChart() {
    const ctx = document.getElementById('customerLoyaltyChart').getContext('2d');
    
    // Prepare data for scatter plot: x=rank/index, y=spending
    const scatterData = customerSpending.map((spending, index) => ({
        x: index + 1,
        y: spending
    }));

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Customer Total Spending',
                data: scatterData,
                backgroundColor: 'rgba(255, 159, 64, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Customer Rank (1 = Highest Spender)' } },
                y: { title: { display: true, text: 'Total Spending ($)' } }
            }
            // removed plugins.title
        }
    });
}

// --- 5. Render Sales Performance (Line Plot) ---
function renderSalesPerformanceChart() {
    const ctx = document.getElementById('salesPerformanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabels,
            datasets: [{
                label: 'Daily Revenue ($)',
                data: dailyRevenue,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
            // removed plugins.title
        }
    });
}

// --- Initialize All Charts ---
window.onload = function() {
    renderProductValueChart();
    renderInventoryMixChart();
    renderLocationPerformanceChart();
    renderCustomerLoyaltyChart();
    renderSalesPerformanceChart();
};