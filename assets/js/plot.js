var prevEvent = { screenX: 0, screenY: 0 };
var currentEvent = { screenX: 0, screenY: 0 };
var speedXData = [0];
var speedYData = [0];
var timeData = [new Date().toLocaleTimeString()];
var chart;
var maxSpeedX = 0;
var maxSpeedY = 0;

function handleInputEvent(event) {
    currentEvent = event;
}

document.documentElement.onmousemove = handleInputEvent;
document.documentElement.addEventListener('touchmove', function (event) {
    handleInputEvent(event.touches[0]);
});

setInterval(function () {
    var speedX = (currentEvent.screenX - prevEvent.screenX)*10;
    var speedY = (prevEvent.screenY - currentEvent.screenY)*10;

    document.getElementById("speedX").innerText = Math.abs(Math.round(speedX));
    document.getElementById("speedY").innerText = Math.abs(Math.round(speedY));

    document.getElementById("maxSpeedX").innerText = Math.round(
        speedX > maxSpeedX ? (maxSpeedX = speedX) : maxSpeedX
    );

    document.getElementById("maxSpeedY").innerText = Math.round(
        speedY > maxSpeedY ? (maxSpeedY = speedY) : maxSpeedY
    );

    if (speedXData.length > 60) {
        speedXData.shift();
        speedYData.shift();
        timeData.shift();
    }

    speedXData.push(speedX);
    speedYData.push(speedY);
    timeData.push(new Date().toLocaleTimeString());

    updateChart();
    prevEvent = currentEvent;
}, 200);

function updateChart() {
    if (!chart) {
        var ctx = document.getElementById("speedChart").getContext("2d");
        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: timeData,
                datasets: [
                    {
                        label: "Speed X",
                        data: speedXData,
                        borderColor: "#B0B0B0",
                        borderWidth: 2,
                        lineTension: 0.3,
                        // fill: "start",
                        backgroundColor: "rgba(185, 115, 47, 0.05)",
                    },
                    {
                        label: "Speed Y",
                        data: speedYData,
                        borderColor: "#4757a5",
                        borderWidth: 2,
                        lineTension: 0.3,
                        // fill: "start",
                        backgroundColor: "rgba(71, 87, 165, 0.05)",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        },
                        border: {
                            display: false,
                        }
                    },
                    y: {
                        ticks: {
                            display: false,
                        },
                        grid: {
                            color: "#e0f5ff",
                        },
                        border: {
                            display: false,
                            dash: [10, 10]
                        }
                    },
                },
            },
        });
    } else {
        chart.data.labels = timeData;
        chart.data.datasets[0].data = speedXData;
        chart.data.datasets[1].data = speedYData;
        chart.update();
    }
}