fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const headers = ['category','model','description','shop','price','availability','link'];
    const table = $('#gpuTable').DataTable({
      data: data,
      ordering: true,
      columns: [
        { data: 'category' },
        { data: 'model' },
        { data: 'description' },
        { data: 'shop' },
        { data: 'price' },
        { data: 'availability' },
        { data: 'link', render: d => `<a href="${d}" target="_blank">link</a>` }
      ]
    });
    $('#gpuTable thead th').each(function(i){
      $(this).append('<br><input type="text" placeholder="Search" />');
      $('input', this)
        .on('click', function(e){
          // Prevent sorting when clicking inside the search box
          e.stopPropagation();
        })
        .on('keyup change', function(e){
          e.stopPropagation();
          if(table.column(i).search() !== this.value){
            table.column(i).search(this.value).draw();
          }
        });
    });
    $('#globalSearch').on('keyup', function(){
      table.search(this.value).draw();
    });
  });
