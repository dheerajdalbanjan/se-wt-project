const body = document.body.innerHTML ; 

var printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write(`<html><head><title>Tapovan</title><style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                text-align: center;
            }
    
            h3, h4 {
                color: #333;
            }
    
            form {
                max-width: 800px;
                margin: auto;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
    
            th, td {
                padding: 10px;
                border: 1px solid #ddd;
            }
    
            .input-group {
                display: flex;
                justify-content: space-between;
            }
    
            label {
                display: block;
                margin-bottom: 5px;
            }
    
            p {
                margin: 0;
                padding: 8px;
                box-sizing: border-box;
            }
        </style>`);
            printWindow.document.write('</head><body >');
            printWindow.document.write(body);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();