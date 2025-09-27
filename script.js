// Traffic AI Simulation Data
class TrafficAI {
    constructor() {
        this.vehicleCount = 1245;
        this.avgWaitTime = 3.2;
        this.trafficFlow = 78;
        this.congestionLevel = 'Medium';
        this.signals = [
            { id: 'signal-1', location: 'MG Road Junction', currentLight: 'red' },
            { id: 'signal-2', location: 'Brigade Road', currentLight: 'green' },
            { id: 'signal-3', location: 'Koramangala', currentLight: 'yellow' }
        ];
        this.isSimulationRunning = false;
        this.emergencyModeActive = false;
        this.init();
    }

    init() {
        this.updateDashboard();
        this.startRealTimeUpdates();
        this.addEventListeners();
    }

    updateDashboard() {
        document.getElementById('vehicle-count').textContent = this.vehicleCount.toLocaleString();
        document.getElementById('avg-wait-time').textContent = `${this.avgWaitTime} min`;
        document.getElementById('traffic-flow').textContent = `${this.trafficFlow}%`;
        document.getElementById('congestion-level').textContent = this.congestionLevel;
    }

    startRealTimeUpdates() {
        setInterval(() => {
            this.simulateTrafficChanges();
            this.updateSignals();
            this.updateDashboard();
        }, 5000);
    }

    simulateTrafficChanges() {
        // Simulate realistic traffic variations
        this.vehicleCount += Math.floor(Math.random() * 20 - 10);
        this.vehicleCount = Math.max(800, Math.min(2000, this.vehicleCount));

        this.avgWaitTime += (Math.random() - 0.5) * 0.5;
        this.avgWaitTime = Math.max(1.0, Math.min(8.0, this.avgWaitTime));
        this.avgWaitTime = Math.round(this.avgWaitTime * 10) / 10;

        this.trafficFlow += Math.floor(Math.random() * 10 - 5);
        this.trafficFlow = Math.max(30, Math.min(95, this.trafficFlow));

        // Update congestion level based on metrics
        if (this.trafficFlow > 80 && this.avgWaitTime < 2.5) {
            this.congestionLevel = 'Low';
        } else if (this.trafficFlow > 60 && this.avgWaitTime < 4.0) {
            this.congestionLevel = 'Medium';
        } else {
            this.congestionLevel = 'High';
        }
    }

    updateSignals() {
        this.signals.forEach(signal => {
            const lights = ['red', 'yellow', 'green'];
            const currentIndex = lights.indexOf(signal.currentLight);
            const nextIndex = (currentIndex + 1) % lights.length;
            signal.currentLight = lights[nextIndex];

            this.renderSignalLight(signal.id, signal.currentLight);
        });
    }

    renderSignalLight(signalId, activeLight) {
        const signalElement = document.getElementById(signalId);
        if (signalElement) {
            const lights = signalElement.querySelectorAll('.light');
            lights.forEach(light => light.classList.remove('active'));
            
            const activeLightElement = signalElement.querySelector(`.${activeLight}`);
            if (activeLightElement) {
                activeLightElement.classList.add('active');
            }
        }
    }

    addEventListeners() {
        // Chart bars animation on hover
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach(bar => {
            bar.addEventListener('mouseenter', () => {
                bar.style.transform = 'scaleY(1.1)';
            });
            bar.addEventListener('mouseleave', () => {
                bar.style.transform = 'scaleY(1)';
            });
        });

        // Animate optimization meter
        const meterFill = document.querySelector('.meter-fill');
        if (meterFill) {
            setInterval(() => {
                const randomWidth = Math.floor(Math.random() * 30) + 60;
                meterFill.style.width = `${randomWidth}%`;
            }, 3000);
        }
    }

    optimizeTraffic() {
        this.showNotification('AI optimization started...', 'info');
        
        setTimeout(() => {
            this.trafficFlow = Math.min(95, this.trafficFlow + 15);
            this.avgWaitTime = Math.max(1.5, this.avgWaitTime - 1);
            this.congestionLevel = 'Low';
            this.updateDashboard();
            this.showNotification('Traffic optimization completed! Flow improved by 15%.', 'success');
        }, 2000);
    }

    generateReport() {
        const reportData = {
            timestamp: new Date().toLocaleString(),
            vehicleCount: this.vehicleCount,
            avgWaitTime: this.avgWaitTime,
            trafficFlow: this.trafficFlow,
            congestionLevel: this.congestionLevel,
            signals: this.signals
        };

        console.log('Traffic Report Generated:', reportData);
        this.showNotification('Traffic report generated and logged to console.', 'info');
        
        // In a real application, this would download a PDF or send to server
        this.downloadReport(reportData);
    }

    downloadReport(data) {
        const reportContent = `
NAMMA TRAFFIC AI - TRAFFIC REPORT
Generated: ${data.timestamp}

TRAFFIC STATISTICS:
- Vehicles Detected: ${data.vehicleCount.toLocaleString()}
- Average Wait Time: ${data.avgWaitTime} minutes
- Traffic Flow Efficiency: ${data.trafficFlow}%
- Congestion Level: ${data.congestionLevel}

SIGNAL STATUS:
${data.signals.map(signal => `- ${signal.location}: ${signal.currentLight.toUpperCase()} light`).join('\n')}

AI RECOMMENDATIONS:
- Monitor MG Road Junction during peak hours
- Optimize signal timing at Brigade Road
- Consider alternate routes during high congestion
        `;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `traffic-report-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    startSimulation() {
        if (this.isSimulationRunning) {
            this.stopSimulation();
            return;
        }

        this.isSimulationRunning = true;
        const button = document.querySelector('.btn-success');
        button.innerHTML = '<i class="fas fa-stop"></i> Stop Simulation';
        button.style.background = 'linear-gradient(135deg, #ff4757, #ff3742)';
        
        this.showNotification('Traffic simulation started. Real-time data updates enabled.', 'info');
        
        this.simulationInterval = setInterval(() => {
            this.simulateAdvancedTrafficScenarios();
        }, 2000);
    }

    stopSimulation() {
        this.isSimulationRunning = false;
        const button = document.querySelector('.btn-success');
        button.innerHTML = '<i class="fas fa-play"></i> Start Simulation';
        button.style.background = 'linear-gradient(135deg, #2ed573, #26d067)';
        
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        
        this.showNotification('Traffic simulation stopped.', 'info');
    }

    simulateAdvancedTrafficScenarios() {
        // Simulate various traffic scenarios
        const scenarios = [
            { 
                name: 'Rush Hour',
                vehicleIncrease: 200,
                waitTimeIncrease: 1.5,
                flowDecrease: 20
            },
            {
                name: 'Accident Reported',
                vehicleIncrease: 50,
                waitTimeIncrease: 3.0,
                flowDecrease: 40
            },
            {
                name: 'Normal Flow',
                vehicleIncrease: -50,
                waitTimeIncrease: -0.5,
                flowDecrease: -10
            }
        ];

        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        this.vehicleCount += scenario.vehicleIncrease;
        this.avgWaitTime += scenario.waitTimeIncrease;
        this.trafficFlow -= scenario.flowDecrease;

        // Ensure values stay within realistic bounds
        this.vehicleCount = Math.max(500, Math.min(2500, this.vehicleCount));
        this.avgWaitTime = Math.max(1.0, Math.min(10.0, this.avgWaitTime));
        this.trafficFlow = Math.max(20, Math.min(95, this.trafficFlow));

        this.showNotification(`Simulation: ${scenario.name} scenario activated`, 'warning');
    }

    emergencyMode() {
        this.emergencyModeActive = !this.emergencyModeActive;
        const button = document.querySelector('.btn-warning');
        
        if (this.emergencyModeActive) {
            button.innerHTML = '<i class="fas fa-times"></i> Disable Emergency';
            button.style.background = 'linear-gradient(135deg, #ff4757, #ff3742)';
            
            // Set all signals to green for emergency vehicles
            this.signals.forEach(signal => {
                signal.currentLight = 'green';
                this.renderSignalLight(signal.id, 'green');
            });
            
            this.showNotification('Emergency mode activated! All signals set to green.', 'warning');
        } else {
            button.innerHTML = '<i class="fas fa-ambulance"></i> Emergency Mode';
            button.style.background = 'linear-gradient(135deg, #ffa502, #ff8f02)';
            this.showNotification('Emergency mode deactivated. Normal operation resumed.', 'info');
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            ${message}
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#d4edda' : type === 'warning' ? '#fff3cd' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'warning' ? '#856404' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'warning' ? '#faeeba' : '#bee5eb'};
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Global functions for button clicks
function optimizeTraffic() {
    trafficAI.optimizeTraffic();
}

function generateReport() {
    trafficAI.generateReport();
}

function startSimulation() {
    trafficAI.startSimulation();
}

function emergencyMode() {
    trafficAI.emergencyMode();
}

// Initialize the application when DOM is loaded
let trafficAI;

document.addEventListener('DOMContentLoaded', function() {
    trafficAI = new TrafficAI();
    
    // Add some initial animations
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Welcome message
    setTimeout(() => {
        trafficAI.showNotification('Welcome to Namma Traffic AI! System initialized successfully.', 'success');
    }, 1000);
});