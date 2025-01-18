import React, { useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from "chart.js";
import useStatistics from "../../../hooks/useStatistics";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement
);

function Statistics() {
    const { statistics, loading, error, fetchAllStatistics } = useStatistics();

    // Dữ liệu cho biểu đồ doanh thu theo sản phẩm (Bar Chart)
    const revenueByProductData = {
        labels: statistics.revenueByProduct.map((item) => item.product_name),
        datasets: [
            {
                label: "Doanh thu (VND)",
                data: statistics.revenueByProduct.map((item) => item.total_revenue),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Xuất dữ liệu dưới dạng Excel
    const exportToExcel = () => {
        // Kiểm tra nếu dữ liệu không trống cho doanh thu theo sản phẩm
        const revenueByProductData = statistics.revenueByProduct.length > 0
            ? [
                ['Tên sản phẩm', 'Doanh thu (VND)'],
                ...statistics.revenueByProduct.map(item => [item.product_name, item.total_revenue]),
            ]
            : [['Không có dữ liệu']];
        
        // Kiểm tra nếu dữ liệu không trống cho doanh thu theo ngày
        const revenueByDateData = statistics.revenueByDate.length > 0
            ? [
                ['Ngày', 'Doanh thu (VND)'],
                ...statistics.revenueByDate.map(item => [item.order_date, item.total_revenue]),
            ]
            : [['Không có dữ liệu']];
        
        // Kiểm tra nếu dữ liệu không trống cho doanh thu theo tháng
        const revenueByMonthData = statistics.revenueByMonth.length > 0
            ? [
                ['Tháng', 'Doanh thu (VND)'],
                ...statistics.revenueByMonth.map(item => [item.month, item.total_revenue]),
            ]
            : [['Không có dữ liệu']];
        
        // Kiểm tra nếu dữ liệu không trống cho doanh thu theo quý
        const revenueByQuarterData = statistics.revenueByQuarter.length > 0
            ? [
                ['Quý', 'Doanh thu (VND)'],
                ...statistics.revenueByQuarter.map(item => [item.quarter, item.total_revenue]),
            ]
            : [['Không có dữ liệu']];
        
        // Kiểm tra nếu dữ liệu không trống cho doanh thu theo năm
        const revenueByYearData = statistics.revenueByYear.length > 0
            ? [
                ['Năm', 'Doanh thu (VND)'],
                ...statistics.revenueByYear.map(item => [item.year, item.total_revenue]),
            ]
            : [['Không có dữ liệu']];
        
        // Kiểm tra nếu dữ liệu không trống cho trạng thái tồn kho
        const stockStatusData = statistics.stockStatus.length > 0
            ? [
                ['Tên sản phẩm', 'Số lượng tồn kho'],
                ...statistics.stockStatus.map(item => [item.product_name, item.stock_quantity]),
            ]
            : [['Không có dữ liệu']];
        
        // Kiểm tra nếu dữ liệu không trống cho sản phẩm bán chạy nhất
        const bestSellingProductData = statistics.bestSellingProduct
            ? [
                ['Tên sản phẩm', 'Số lượng bán'],
                [statistics.bestSellingProduct.product_name, statistics.bestSellingProduct.total_quantity_sold],
            ]
            : [['Không có dữ liệu']];
        
        const wb = XLSX.utils.book_new();
        // Append dữ liệu vào từng sheet
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(revenueByProductData), 'Doanh thu theo sản phẩm');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(revenueByDateData), 'Doanh thu theo ngày');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(revenueByMonthData), 'Doanh thu theo tháng');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(revenueByQuarterData), 'Doanh thu theo quý');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(revenueByYearData), 'Doanh thu theo năm');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(stockStatusData), 'Trạng thái tồn kho');
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(bestSellingProductData), 'Sản phẩm bán chạy nhất');
        
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        saveAs(blob, 'thong_ke_danh_sach.xlsx');
    };
    

    // Xuất dữ liệu dưới dạng CSV
    const exportToCSV = () => {
        const revenueByProductData = [
            ['Tên sản phẩm', 'Doanh thu (VND)'],
            ...statistics.revenueByProduct.map(item => [item.product_name, item.total_revenue]),
        ];
    
        const revenueByDateData = [
            ['Ngày', 'Doanh thu (VND)'],
            ...statistics.revenueByDate.map(item => [item.order_date, item.total_revenue]),
        ];
    
        const revenueByMonthData = [
            ['Tháng', 'Doanh thu (VND)'],
            ...statistics.revenueByMonth.map(item => [item.month, item.total_revenue]),
        ];

        const revenueByYearData = [
            ['Năm', 'Doanh thu (VND)'],
            ...statistics.revenueByYear.map(item => [item.year, item.total_revenue]),
        ];
    
    
        const revenueByQuarterData = [
            ['Quý', 'Doanh thu (VND)'],
            ...statistics.revenueByQuarter.map(item => [item.quarter, item.total_revenue]),
        ];
    
        const stockStatusData = [
            ['Tên sản phẩm', 'Số lượng tồn kho'],
            ...statistics.stockStatus.map(item => [item.product_name, item.stock_quantity]),
        ];
    
        const bestSellingProductData = [
            ['Tên sản phẩm', 'Số lượng bán'],
            [statistics.bestSellingProduct.product_name, statistics.bestSellingProduct.total_quantity_sold],
        ];
    
        const allData = [
        { name: 'Doanh thu theo sản phẩm', data: revenueByProductData },
        { name: 'Doanh thu theo ngày', data: revenueByDateData },
        { name: 'Doanh thu theo tháng', data: revenueByMonthData },
        { name: 'Doanh thu theo năm', data: revenueByYearData },
        { name: 'Doanh thu theo quý', data: revenueByQuarterData },
        { name: 'Trạng thái tồn kho', data: stockStatusData },
        { name: 'Sản phẩm bán chạy nhất', data: bestSellingProductData }
    ];
        let csvContent = "\ufeff"; // Thêm BOM vào đầu file để hỗ trợ UTF-8
        allData.forEach(sheet => {
            csvContent += `\n\n${sheet.name}\n`;
            sheet.data.forEach(row => {
                csvContent += row.join(",") + "\r\n";
            });
        });
    
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "thong_ke_danh_sach.csv");
        document.body.appendChild(link);
        link.click();
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Dữ liệu cho biểu đồ tồn kho sản phẩm (Pie Chart)
    const stockStatusDataChart = {
        labels: statistics.stockStatus.map((item) => item.product_name),
        datasets: [
            {
                label: "Số lượng tồn kho",
                data: statistics.stockStatus.map((item) => item.stock_quantity),
                backgroundColor: statistics.stockStatus.map(() => getRandomColor()), // Tạo màu ngẫu nhiên cho từng sản phẩm
                borderColor: statistics.stockStatus.map(() => getRandomColor()), // Tạo màu ngẫu nhiên cho từng sản phẩm
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mx-auto p-6">
        
      
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={fetchAllStatistics}
            disabled={loading}
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-xl hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? "Đang tải..." : "Làm mới thống kê"}
          </button>
          {error && <p className="text-red-600 ml-4 text-lg font-semibold">{error}</p>}
        </div>
      
        {/* Doanh thu theo sản phẩm */}
        <h2 className="text-3xl font-semibold mt-8 text-gray-800">Doanh thu theo sản phẩm</h2>
        <div className="w-full md:w-1/2 mx-auto h-80 mt-4 rounded-lg overflow-hidden shadow-lg bg-white">
          {statistics.revenueByProduct.length > 0 ? (
            <Bar data={revenueByProductData} options={{ responsive: true }} />
          ) : (
            <p className="text-center text-gray-400 py-20">Không có dữ liệu doanh thu theo sản phẩm.</p>
          )}
        </div>
      
        {/* Doanh thu theo ngày */}
        <h2 className="text-3xl font-semibold mt-12 text-gray-800">Doanh thu theo ngày</h2>
        <div className="w-full md:w-1/2 mx-auto h-80 mt-4 rounded-lg overflow-hidden shadow-lg bg-white">
          {statistics.revenueByDate.length > 0 ? (
            <Line
              data={{
                labels: statistics.revenueByDate.map((item) => item.order_date),
                datasets: [
                  {
                    label: "Doanh thu (VND)",
                    data: statistics.revenueByDate.map((item) => item.total_revenue),
                    backgroundColor: [
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                    ],
                    borderColor: [
                      "rgba(54, 162, 235, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          ) : (
            <p className="text-center text-gray-400 py-20">Không có dữ liệu doanh thu theo ngày.</p>
          )}
        </div>
      
        {/* Doanh thu theo tháng */}
        <h2 className="text-3xl font-semibold mt-12 text-gray-800">Doanh thu theo tháng</h2>
        <div className="w-full md:w-1/2 mx-auto h-80 mt-4 rounded-lg overflow-hidden shadow-lg bg-white">
          {statistics.revenueByMonth.length > 0 ? (
            <Line
              data={{
                labels: statistics.revenueByMonth.map((item) => item.month),
                datasets: [
                  {
                    label: "Doanh thu (VND)",
                    data: statistics.revenueByMonth.map((item) => item.total_revenue),
                    borderColor: "rgba(255, 159, 64, 1)",
                    backgroundColor: "rgba(255, 159, 64, 0.2)",
                    pointBackgroundColor: "rgba(255, 159, 64, 1)",
                    pointBorderColor: "#fff",
                    pointRadius: 6,
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          ) : (
            <p className="text-center text-gray-400 py-20">Không có dữ liệu doanh thu theo tháng.</p>
          )}
        </div>
      
        {/* Tồn kho sản phẩm */}
        <h2 className="text-3xl font-semibold text-center mt-12 text-gray-800">Trạng thái tồn kho</h2>
        <div className="w-full md:w-4/5 mx-auto h-96 border border-gray-300 rounded-lg p-8 bg-gray-50 shadow-lg">
          {statistics.stockStatus.length > 0 ? (
            <Pie
              data={stockStatusDataChart}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        const label = tooltipItem.label || "";
                        const quantity = tooltipItem.raw || 0;
                        return `${label}: ${quantity} sản phẩm`;
                      },
                    },
                  },
                  legend: {
                    position: "bottom",
                    labels: {
                      font: {
                        size: 16,
                        weight: "bold",
                      },
                      boxWidth: 25,
                      padding: 25,
                    },
                  },
                },
              }}
            />
          ) : (
            <p className="text-center text-xl text-gray-500 py-20">Không có dữ liệu tồn kho sản phẩm.</p>
          )}
        </div>
      
        {/* Sản phẩm bán chạy nhất */}
        <h2 className="text-3xl font-semibold mt-12 text-gray-800">Sản phẩm bán chạy nhất</h2>
        {statistics.bestSellingProduct ? (
          <div>
            <p className="text-lg"><strong className="font-semibold">Tên sản phẩm:</strong> {statistics.bestSellingProduct.product_name}</p>
            <p className="text-lg"><strong className="font-semibold">Số lượng bán:</strong> {statistics.bestSellingProduct.total_quantity_sold}</p>
          </div>
        ) : (
          <p className="text-center text-gray-400 py-6">Không có dữ liệu sản phẩm bán chạy nhất.</p>
        )}
      
        {/* Nút xuất ở góc dưới bên phải */}
        <div className="fixed bottom-6 right-6 flex space-x-4">
          <button
            onClick={exportToExcel}
            disabled={loading}
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-xl hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Xuất Excel
          </button>
          <button
            onClick={exportToCSV}
            disabled={loading}
            className="px-8 py-4 bg-yellow-600 text-white font-semibold rounded-lg shadow-xl hover:bg-yellow-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Xuất CSV
          </button>
        </div>
      </div>
      

      
      
    );
}

export default Statistics;
