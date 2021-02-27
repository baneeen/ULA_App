//code-source : https://www.aspsnippets.com/Articles/Print-HTML-Table-using-JavaScript.aspx
function print() {
  var divToPrint = document.getElementById("tableToPrint").innerHTML;
  
  var printWindow = window.open('', '', 'height=200,width=400');
  printWindow.document.write('<html><head><title>Table Contents</title></head');

  //Print the DIV contents i.e. the HTML Table.
  printWindow.document.write('<body>');

  printWindow.document.write(divToPrint);
  printWindow.document.write('</body>');

  printWindow.document.write('</html>');
  printWindow.document.close();
  printWindow.print();
  
}


