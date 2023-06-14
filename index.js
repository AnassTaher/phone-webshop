$(function() {
  // Task 1: Sort table
  // Reference 1: https://mottie.github.io/tablesorter/docs/
  // reference 2: https://stackoverflow.com/questions/247305/using-jquery-tablesorter-on-dynamically-modified-table/247319
  $(function () {
    // Sort tables, only these columns need to be sorted (there isn't an appropriate sorting for the other columns)
    $("#table_phones").tablesorter({ sortList: [[0,0], [1,0], [2,0]]});
    $("#sim_only_table").tablesorter({ sortList: [[0,1], [0,2], [0,3]]}); 
  });

  // Task 2: Reset database
  $("#reset_button").click(function() {
    $.get("https://wt.ops.labs.vu.nl/api22/3daa1c8a/reset", function() {
      reformTable();
    });
  });

  //Task 3:
  function reformTable() {
    $.get("https://wt.ops.labs.vu.nl/api22/3daa1c8a", done = function(data) {
    $(".delete").remove();
      $.each(data, function(key, val) {
        var tr = $(
          `
          <tr class="delete">
          <td></td> 
          <td>  ${val.brand} </td> 
          <td>  ${val.model}  </td> 
          <td>  ${val.os} </td> 
          <td> ${val.screensize} </td> 
          <td class = "image_data"> <img src="${val.image}" class = "phone"> </td>
          </tr>
          `
        );
        $(tr).insertBefore("#top_5_form_row");
        $('#table_phones').tablesorter().trigger('update');
      });
    }, "json");
  }

  reformTable();

  $("#submit_button").click(function() {
    $("#form_phones").submit(function(event) {
      event.preventDefault(); //Prevent the user from going to another page
        //Post the data from the form to the database
        $.ajax({
            method: "POST",
            url: "https://wt.ops.labs.vu.nl/api22/3daa1c8a",
            data: $('#form_phones').serialize(),
            dataType: "jason",
            cache: false,
            contentType: false,
            processData: false,
        });
        reformTable();
        // Empty out the (HTML) table contents
        document.getElementById('brand').value = '';
        document.getElementById('model').value = '';
        document.getElementById('os').value = '';
        document.getElementById('screensize').value = '';
        document.getElementById('image').value = '';
    });
  });
});