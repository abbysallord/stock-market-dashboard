// Stock Market Dashboard JavaScript - FIXED VERSION
class StockDashboard {
    constructor() {
        this.stockChart = null;
        this.volumeChart = null;
        this.fullscreenChart = null;
        this.currentSymbol = 'AAPL';
        this.currentPeriod = '1D';
        this.activeIndicators = new Set();
        
        // Embed all data directly - NO EXTERNAL CALLS
        this.companiesData = {
            "AAPL": {
                "name": "Apple Inc.",
                "sector": "Technology",
                "current_price": 233.33,
                "change": 3.68,
                "change_percent": 1.60,
                "pe_ratio": 32.14,
                "market_cap": 3462710532000.0,
                "dividend_yield": 0.437,
                "week_52_high": 234.82,
                "week_52_low": 164.08,
                "avg_volume": 45000000
            },
            "MSFT": {
                "name": "Microsoft Corporation",
                "sector": "Technology",
                "current_price": 520.58,
                "change": -8.66,
                "change_percent": -1.64,
                "pe_ratio": 38.22,
                "market_cap": 3869559638600.0,
                "dividend_yield": 0.622,
                "week_52_high": 468.35,
                "week_52_low": 362.90,
                "avg_volume": 18000000
            },
            "GOOGL": {
                "name": "Alphabet Inc Class A",
                "sector": "Technology",
                "current_price": 175.20,
                "change": 2.45,
                "change_percent": 1.42,
                "pe_ratio": 24.8,
                "market_cap": 2100000000000.0,
                "dividend_yield": 0.0,
                "week_52_high": 193.31,
                "week_52_low": 129.40,
                "avg_volume": 25000000
            },
            "AMZN": {
                "name": "Amazon.com Inc",
                "sector": "Consumer Cyclical",
                "current_price": 185.45,
                "change": -1.25,
                "change_percent": -0.67,
                "pe_ratio": 48.5,
                "market_cap": 1950000000000.0,
                "dividend_yield": 0.0,
                "week_52_high": 201.20,
                "week_52_low": 144.05,
                "avg_volume": 35000000
            },
            "TSLA": {
                "name": "Tesla Inc",
                "sector": "Consumer Cyclical",
                "current_price": 245.80,
                "change": 5.67,
                "change_percent": 2.36,
                "pe_ratio": 68.2,
                "market_cap": 780000000000.0,
                "dividend_yield": 0.0,
                "week_52_high": 299.29,
                "week_52_low": 138.80,
                "avg_volume": 75000000
            },
            "META": {
                "name": "Meta Platforms Inc",
                "sector": "Technology",
                "current_price": 512.34,
                "change": 8.92,
                "change_percent": 1.77,
                "pe_ratio": 26.4,
                "market_cap": 1300000000000.0,
                "dividend_yield": 0.35,
                "week_52_high": 542.81,
                "week_52_low": 313.66,
                "avg_volume": 22000000
            },
            "NVDA": {
                "name": "NVIDIA Corporation",
                "sector": "Technology",
                "current_price": 115.20,
                "change": -2.15,
                "change_percent": -1.83,
                "pe_ratio": 71.3,
                "market_cap": 2850000000000.0,
                "dividend_yield": 0.12,
                "week_52_high": 140.76,
                "week_52_low": 39.23,
                "avg_volume": 55000000
            },
            "JPM": {
                "name": "JPMorgan Chase & Co",
                "sector": "Financial Services",
                "current_price": 215.67,
                "change": 1.34,
                "change_percent": 0.63,
                "pe_ratio": 12.8,
                "market_cap": 630000000000.0,
                "dividend_yield": 2.1,
                "week_52_high": 224.91,
                "week_52_low": 135.19,
                "avg_volume": 12000000
            },
            "JNJ": {
                "name": "Johnson & Johnson",
                "sector": "Healthcare",
                "current_price": 162.45,
                "change": -0.85,
                "change_percent": -0.52,
                "pe_ratio": 15.7,
                "market_cap": 427000000000.0,
                "dividend_yield": 3.2,
                "week_52_high": 174.26,
                "week_52_low": 143.13,
                "avg_volume": 8000000
            },
            "V": {
                "name": "Visa Inc",
                "sector": "Financial Services",
                "current_price": 275.89,
                "change": 2.78,
                "change_percent": 1.02,
                "pe_ratio": 32.1,
                "market_cap": 590000000000.0,
                "dividend_yield": 0.75,
                "week_52_high": 290.96,
                "week_52_low": 244.11,
                "avg_volume": 6000000
            }
        };

        this.init();
    }

    init() {
        // Generate chart data for all companies
        this.generateChartData();
        
        // Setup all event listeners
        this.setupEventListeners();
        
        // Render company list
        this.renderCompanyList();
        
        // Start with AAPL selected
        this.selectCompany('AAPL');
        
        // Start real-time updates
        this.startRealTimeUpdates();
        this.updateMarketTime();
    }

    generateChartData() {
        // Simple chart data generation
        this.chartData = {};
        
        Object.keys(this.companiesData).forEach(symbol => {
            const currentPrice = this.companiesData[symbol].current_price;
            const data = [];
            const volumes = [];
            
            // Generate 12 data points over time
            for (let i = 0; i < 12; i++) {
                const date = new Date(2024, 4, 14 + i).toISOString().split('T')[0];
                const variation = 0.95 + (Math.random() * 0.1); // ±5% variation
                const price = currentPrice * variation * (0.85 + (i * 0.015)); // gradual upward trend
                const volume = Math.floor(this.companiesData[symbol].avg_volume * (0.8 + Math.random() * 0.4));
                
                data.push({ date, price, volume });
            }
            
            this.chartData[symbol] = data;
        });
    }

    setupEventListeners() {
        // Company search
        const searchInput = document.getElementById('companySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterCompanies(e.target.value);
            });
        }

        // Time period buttons
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentPeriod = e.target.dataset.period;
                this.updateCharts();
            });
        });

        // Technical indicators
        document.querySelectorAll('.indicator-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indicator = e.target.dataset.indicator;
                if (this.activeIndicators.has(indicator)) {
                    this.activeIndicators.delete(indicator);
                    e.target.classList.remove('active');
                } else {
                    this.activeIndicators.add(indicator);
                    e.target.classList.add('active');
                }
                this.updateCharts();
            });
        });

        // Watchlist button
        const watchlistBtn = document.getElementById('watchlistBtn');
        if (watchlistBtn) {
            watchlistBtn.addEventListener('click', () => {
                this.toggleWatchlist();
            });
        }

        // Fullscreen button
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openFullscreen();
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportChart();
            });
        }

        // Modal events
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            });
        }

        const modalBackdrop = document.getElementById('modalBackdrop');
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            });
        }

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    renderCompanyList() {
        const container = document.getElementById('companyList');
        if (!container) return;
        
        container.innerHTML = '';

        Object.entries(this.companiesData).forEach(([symbol, data]) => {
            const isPositive = data.change >= 0;
            
            const item = document.createElement('div');
            item.className = `company-item ${symbol === this.currentSymbol ? 'selected' : ''}`;
            item.dataset.symbol = symbol;
            item.innerHTML = `
                <div class="company-info">
                    <div class="company-symbol">${symbol}</div>
                    <div class="company-name">${data.name}</div>
                </div>
                <div class="company-price-info">
                    <div class="company-price">$${data.current_price.toFixed(2)}</div>
                    <div class="company-change ${isPositive ? 'positive' : 'negative'}">
                        ${isPositive ? '+' : ''}$${data.change.toFixed(2)} (${isPositive ? '+' : ''}${data.change_percent.toFixed(2)}%)
                    </div>
                </div>
            `;
            
            item.addEventListener('click', () => {
                this.selectCompany(symbol);
            });
            
            container.appendChild(item);
        });
    }

    selectCompany(symbol) {
        this.currentSymbol = symbol;
        
        // Update selected state
        document.querySelectorAll('.company-item').forEach(item => {
            item.classList.remove('selected');
            if (item.dataset.symbol === symbol) {
                item.classList.add('selected');
            }
        });
        
        this.updateStockHeader();
        this.updateCharts();
        this.updateStockDetails();
        this.updateTechnicalAnalysis();
    }

    updateStockHeader() {
        const data = this.companiesData[this.currentSymbol];
        const isPositive = data.change >= 0;
        
        document.getElementById('currentSymbol').textContent = this.currentSymbol;
        document.getElementById('currentName').textContent = data.name;
        document.getElementById('currentSector').textContent = data.sector;
        document.getElementById('currentPrice').textContent = `$${data.current_price.toFixed(2)}`;
        
        const changeEl = document.getElementById('priceChange');
        changeEl.textContent = `${isPositive ? '+' : ''}$${data.change.toFixed(2)} (${isPositive ? '+' : ''}${data.change_percent.toFixed(2)}%)`;
        changeEl.className = `price-change ${isPositive ? 'positive' : 'negative'}`;
        
        document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString('en-US', {
            hour12: false,
            timeZone: 'America/New_York'
        }) + ' EST';
    }

    updateCharts() {
        this.createPriceChart();
        this.createVolumeChart();
    }

    createPriceChart() {
        const canvas = document.getElementById('stockChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart
        if (this.stockChart) {
            this.stockChart.destroy();
        }

        // Get data for current symbol
        const data = this.chartData[this.currentSymbol] || [];
        
        // Filter based on period
        let filteredData = data;
        if (this.currentPeriod === '1D') {
            filteredData = data.slice(-1);
        } else if (this.currentPeriod === '1W') {
            filteredData = data.slice(-5);
        } else if (this.currentPeriod === '1M') {
            filteredData = data.slice(-8);
        }

        const labels = filteredData.map(d => d.date);
        const prices = filteredData.map(d => d.price);

        // Prepare datasets
        const datasets = [{
            label: 'Stock Price',
            data: prices,
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#1FB8CD',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
        }];

        // Add technical indicators
        if (this.activeIndicators.has('sma20')) {
            const sma20 = this.calculateSMA(prices, Math.min(20, prices.length));
            datasets.push({
                label: 'SMA 20',
                data: sma20,
                borderColor: '#FFC185',
                backgroundColor: 'transparent',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                tension: 0.1
            });
        }

        if (this.activeIndicators.has('sma50')) {
            const sma50 = this.calculateSMA(prices, Math.min(50, prices.length));
            datasets.push({
                label: 'SMA 50',
                data: sma50,
                borderColor: '#B4413C',
                backgroundColor: 'transparent',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                tension: 0.1
            });
        }

        // Create chart
        this.stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: datasets.length > 1,
                        labels: {
                            color: '#f5f5f5',
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(38, 40, 40, 0.95)',
                        titleColor: '#f5f5f5',
                        bodyColor: '#f5f5f5',
                        borderColor: '#1FB8CD',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: { color: 'rgba(119, 124, 124, 0.2)' },
                        ticks: { color: '#a7a9a9', maxTicksLimit: 6 }
                    },
                    y: {
                        display: true,
                        grid: { color: 'rgba(119, 124, 124, 0.2)' },
                        ticks: {
                            color: '#a7a9a9',
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        }
                    }
                }
            }
        });
    }

    createVolumeChart() {
        const canvas = document.getElementById('volumeChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.volumeChart) {
            this.volumeChart.destroy();
        }

        const data = this.chartData[this.currentSymbol] || [];
        let filteredData = data;
        
        if (this.currentPeriod === '1D') {
            filteredData = data.slice(-1);
        } else if (this.currentPeriod === '1W') {
            filteredData = data.slice(-5);
        } else if (this.currentPeriod === '1M') {
            filteredData = data.slice(-8);
        }

        const labels = filteredData.map(d => d.date);
        const volumes = filteredData.map(d => d.volume);

        this.volumeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Volume',
                    data: volumes,
                    backgroundColor: '#FFC185',
                    borderColor: '#FFC185',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(38, 40, 40, 0.95)',
                        titleColor: '#f5f5f5',
                        bodyColor: '#f5f5f5',
                        borderColor: '#FFC185',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `Volume: ${(context.parsed.y / 1000000).toFixed(1)}M`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: { color: 'rgba(119, 124, 124, 0.2)' },
                        ticks: { color: '#a7a9a9', maxTicksLimit: 6 }
                    },
                    y: {
                        display: true,
                        grid: { color: 'rgba(119, 124, 124, 0.2)' },
                        ticks: {
                            color: '#a7a9a9',
                            callback: function(value) {
                                return (value / 1000000).toFixed(0) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    calculateSMA(data, period) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            if (i < period - 1) {
                result.push(null);
            } else {
                let sum = 0;
                for (let j = i - period + 1; j <= i; j++) {
                    sum += data[j];
                }
                result.push(sum / period);
            }
        }
        return result;
    }

    updateStockDetails() {
        const data = this.companiesData[this.currentSymbol];
        
        document.getElementById('marketCap').textContent = this.formatMarketCap(data.market_cap);
        document.getElementById('peRatio').textContent = data.pe_ratio.toFixed(2);
        document.getElementById('dividendYield').textContent = data.dividend_yield.toFixed(3) + '%';
        document.getElementById('weekHigh').textContent = `$${data.week_52_high.toFixed(2)}`;
        document.getElementById('weekLow').textContent = `$${data.week_52_low.toFixed(2)}`;
        document.getElementById('avgVolume').textContent = this.formatVolume(data.avg_volume);
        
        // Risk level
        const volatility = (data.week_52_high - data.week_52_low) / data.current_price;
        let riskLevel, riskClass;
        if (volatility < 0.3) {
            riskLevel = 'Low';
            riskClass = 'risk-low';
        } else if (volatility < 0.6) {
            riskLevel = 'Medium';
            riskClass = 'risk-medium';
        } else {
            riskLevel = 'High';
            riskClass = 'risk-high';
        }
        
        const riskEl = document.getElementById('riskLevel');
        riskEl.textContent = riskLevel;
        riskEl.className = `detail-value ${riskClass}`;
        
        // AI Prediction
        const predictionEl = document.getElementById('aiPrediction');
        if (data.change > 0) {
            predictionEl.textContent = '↗ Bullish';
            predictionEl.className = 'detail-value prediction-bullish';
        } else {
            predictionEl.textContent = '↘ Bearish';
            predictionEl.className = 'detail-value prediction-bearish';
        }
    }

    updateTechnicalAnalysis() {
        // Update technical indicators with realistic values
        const technicalItems = document.querySelectorAll('.technical-item');
        if (technicalItems.length >= 4) {
            // RSI
            const rsi = 45 + Math.random() * 30; // 45-75 range
            technicalItems[0].querySelector('.technical-value').textContent = rsi.toFixed(1);
            
            // MACD
            const macd = (Math.random() - 0.5) * 4; // -2 to 2 range
            technicalItems[1].querySelector('.technical-value').textContent = macd.toFixed(2);
            
            // SMA values
            const currentPrice = this.companiesData[this.currentSymbol].current_price;
            technicalItems[2].querySelector('.technical-value').textContent = `$${(currentPrice * 0.98).toFixed(2)}`;
            technicalItems[3].querySelector('.technical-value').textContent = `$${(currentPrice * 0.95).toFixed(2)}`;
        }
    }

    formatMarketCap(value) {
        if (value >= 1e12) {
            return `$${(value / 1e12).toFixed(2)}T`;
        } else if (value >= 1e9) {
            return `$${(value / 1e9).toFixed(2)}B`;
        } else {
            return `$${(value / 1e6).toFixed(2)}M`;
        }
    }

    formatVolume(value) {
        if (value >= 1e6) {
            return `${(value / 1e6).toFixed(1)}M`;
        } else if (value >= 1e3) {
            return `${(value / 1e3).toFixed(1)}K`;
        } else {
            return value.toString();
        }
    }

    filterCompanies(query) {
        const items = document.querySelectorAll('.company-item');
        const lowerQuery = query.toLowerCase();
        
        items.forEach(item => {
            const symbol = item.querySelector('.company-symbol').textContent.toLowerCase();
            const name = item.querySelector('.company-name').textContent.toLowerCase();
            
            if (symbol.includes(lowerQuery) || name.includes(lowerQuery)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    toggleWatchlist() {
        const btn = document.getElementById('watchlistBtn');
        const heartIcon = btn.querySelector('.heart-icon');
        
        if (heartIcon.textContent === '♡') {
            heartIcon.textContent = '♥';
            btn.innerHTML = `<span class="heart-icon">♥</span> Remove from Watchlist`;
            btn.classList.add('btn--primary');
            btn.classList.remove('btn--secondary');
        } else {
            heartIcon.textContent = '♡';
            btn.innerHTML = `<span class="heart-icon">♡</span> Add to Watchlist`;
            btn.classList.add('btn--secondary');
            btn.classList.remove('btn--primary');
        }
    }

    openFullscreen() {
        const modal = document.getElementById('fullscreenModal');
        const title = document.getElementById('modalStockTitle');
        
        if (!modal) return;
        
        title.textContent = `${this.currentSymbol} - ${this.companiesData[this.currentSymbol].name}`;
        modal.classList.remove('hidden');
        
        // Create fullscreen chart
        setTimeout(() => {
            this.createFullscreenChart();
        }, 100);
    }

    createFullscreenChart() {
        const canvas = document.getElementById('fullscreenChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (this.fullscreenChart) {
            this.fullscreenChart.destroy();
        }

        const data = this.chartData[this.currentSymbol] || [];
        const labels = data.map(d => d.date);
        const prices = data.map(d => d.price);
        
        this.fullscreenChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price',
                    data: prices,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(38, 40, 40, 0.95)',
                        titleColor: '#f5f5f5',
                        bodyColor: '#f5f5f5',
                        borderColor: '#1FB8CD',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `Price: $${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: { color: 'rgba(119, 124, 124, 0.2)' },
                        ticks: { color: '#a7a9a9' }
                    },
                    y: {
                        display: true,
                        grid: { color: 'rgba(119, 124, 124, 0.2)' },
                        ticks: {
                            color: '#a7a9a9',
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        }
                    }
                }
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('fullscreenModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        
        if (this.fullscreenChart) {
            this.fullscreenChart.destroy();
            this.fullscreenChart = null;
        }
    }

    exportChart() {
        if (this.stockChart) {
            const link = document.createElement('a');
            link.download = `${this.currentSymbol}_chart.png`;
            link.href = this.stockChart.toBase64Image();
            link.click();
        }
    }

    startRealTimeUpdates() {
        setInterval(() => {
            Object.entries(this.companiesData).forEach(([symbol, data]) => {
                const changePercent = (Math.random() - 0.5) * 0.02; // ±1%
                const newChange = data.current_price * changePercent;
                
                this.companiesData[symbol].change = newChange;
                this.companiesData[symbol].change_percent = (newChange / (data.current_price - newChange)) * 100;
                this.companiesData[symbol].current_price += newChange;
            });
            
            this.renderCompanyList();
            this.updateStockHeader();
            this.updateMarketIndices();
        }, 5000);
    }

    updateMarketIndices() {
        const indices = [
            { id: 'spy-card', change: (Math.random() - 0.5) * 1.0 },
            { id: 'qqq-card', change: (Math.random() - 0.5) * 1.4 },
            { id: 'dia-card', change: (Math.random() - 0.5) * 0.6 }
        ];
        
        indices.forEach(index => {
            const card = document.getElementById(index.id);
            if (!card) return;
            
            const valueElement = card.querySelector('.index-value');
            const changeElement = card.querySelector('.index-change');
            
            if (!valueElement || !changeElement) return;
            
            const currentValue = parseFloat(valueElement.textContent.replace(/,/g, ''));
            const newValue = currentValue + index.change;
            const changeValue = index.change;
            const changePercent = (changeValue / currentValue * 100).toFixed(2);
            
            valueElement.textContent = newValue.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });
            
            const isPositive = changeValue >= 0;
            changeElement.textContent = `${isPositive ? '+' : ''}${changeValue.toFixed(2)} (${isPositive ? '+' : ''}${changePercent}%)`;
            changeElement.className = `index-change ${isPositive ? 'positive' : 'negative'}`;
        });
    }

    updateMarketTime() {
        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                timeZone: 'America/New_York'
            });
            const timeElement = document.getElementById('marketTime');
            if (timeElement) {
                timeElement.textContent = timeString + ' EST';
            }
        }, 1000);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    new StockDashboard();
});