// Principal funtion that will be called when the page is loaded
$(document).ready(function () {
    // Removes the required textContent
    $.validator.messages.required = "";
    // Edit table button
    $(document).on("click", "#editar", function () {
      var fila = $(this).closest("tr");
      var PO = fila.find("td").eq(1).html();
      console.log(PO);
      var idd = $(this).html();
      var id = "";
      let i = 4;
      while (idd[i] != "<") {
        id += idd[i];
        i++;
      }
      i = 0;
  
      console.log(id);
    });
  
    // This variable is used to get thi form to add new loads
    const frm = document.getElementById("loadForm");
    // This variable is used to get the alertPlaceholder
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  
    // Alert function
    const alert = (message, type) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");
  
      alertPlaceholder.append(wrapper);
    };
  
    //Incvocate the function to load the table loads
    load_data_loads();
  
    // This function is used to load the table loads
    function load_data_loads(query) {
      $.ajax({
        url: "southbound_fetch.php",
        method: "POST",
        data: { query: query },
        success: function (data) {
          $("#southbound_result").html(data);
          row_color();
        },
      });
    }
  
    $("#southbound_search_text").keyup(function () {
      var search = $(this).val();
      if (search != "") {
        load_data_loads(search);
      } else {
        load_data_loads();
      }
    });
  
    id = null;
    $("#loadForm").validate();
  
    $("#enviar").click(function (e) {
      e.preventDefault();
      if ($("#loadForm").valid()) {
        $("#type").removeClass("is-invalid");
        $("#type").addClass("is-valid");
        $("#direct_transload").removeClass("is-invalid");
        $("#direct_transload").addClass("is-valid");
        $("#pickup").removeClass("is-invalid");
        $("#pickup").addClass("is-valid");
        $("#PO").removeClass("is-invalid");
        $("#PO").addClass("is-valid");
        $("#client_id").removeClass("is-invalid");
        $("#client_id").addClass("is-valid");
        $("#custom_broker_id").removeClass("is-invalid");
        $("#custom_broker_id").addClass("is-valid");
        $("#origin_address_id").removeClass("is-invalid");
        $("#origin_address_id").addClass("is-valid");
        $("#destination_address_id").removeClass("is-invalid");
        $("#destination_address_id").addClass("is-valid");
        type = $.trim($("#type").val());
        direct_transload = $.trim($("#direct_transload").val());
        pickup = $.trim($("#pickup").val());
        origin_address_id = $.trim($("#origin_address_id").val());
        destination_address_id = $.trim($("#destination_address_id").val());
        PO = $.trim($("#PO").val());
        supplier_id = $.trim($("#supplier_id").val());
        client_id = $.trim($("#client_id").val());
        carrier_usa_id = $.trim($("#carrier_usa_id").val());
        carrier_mx_id = $.trim($("#carrier_mx_id").val());
        trailer_usa = $.trim($("#trailer_usa").val());
        trailer_mx = $.trim($("#trailer_mx").val());
        custom_broker_id = $.trim($("#custom_broker_id").val());
        truck = $.trim($("#truck").val());
        driver_name = $.trim($("#driver_name").val());
        $.ajax({
          url: "add_load.php",
          type: "POST",
          dataType: "json",
          data: {
            type: type,
            direct_transload: direct_transload,
            client_id: client_id,
            pickup: pickup,
            origin_address_id: origin_address_id,
            destination_address_id: destination_address_id,
            PO: PO,
            supplier_id: supplier_id,
            carrier_usa_id: carrier_usa_id,
            carrier_mx_id: carrier_mx_id,
            trailer_usa: trailer_usa,
            trailer_mx: trailer_mx,
            custom_broker_id: custom_broker_id,
            truck: truck,
            driver_name: driver_name,
            id: id,
          },
          success: function (data) {
            console.log(data);
            alert("Carga Añadida!", "success");
            load_data_loads();
            $("#exampleModal").modal("hide");
            frm.reset();
            $("#type").removeClass("is-valid");
            $("#direct_transload").removeClass("is-valid");
            $("#pickup").removeClass("is-valid");
            $("#PO").removeClass("is-valid");
            $("#client_id").removeClass("is-valid");
            $("#custom_broker_id").removeClass("is-valid");
            $("#origin_address_id").removeClass("is-valid");
            $("#destination_address_id").removeClass("is-valid");
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus, "danger");
            alert("Error: " + errorThrown, "danger");
          },
        });
      } else {
        if ($.trim($("#type").val()) == "") {
          $("#type").addClass("is-invalid");
        } else {
          $("#type").addClass("is-valid");
        }
        if ($.trim($("#pickup").val()) == "") {
          $("#pickup").addClass("is-invalid");
        } else {
          $("#pickup").addClass("is-valid");
        }
        if ($.trim($("#direct_transload").val()) == "") {
          $("#direct_transload").addClass("is-invalid");
        } else {
          $("#direct_transload").addClass("is-valid");
        }
        if ($.trim($("#PO").val()) == "") {
          $("#PO").addClass("is-invalid");
        } else {
          $("#PO").addClass("is-valid");
        }
        if ($.trim($("#client_id").val()) == "") {
          $("#client_id").addClass("is-invalid");
        } else {
          $("#client_id").addClass("is-valid");
        }
        if ($.trim($("#origin_address_id").val()) == "") {
          $("#origin_address_id").addClass("is-invalid");
        } else {
          $("#origin_address_id").addClass("is-valid");
        }
        if ($.trim($("#destination_address_id").val()) == "") {
          $("#destination_address_id").addClass("is-invalid");
        } else {
          $("#destination_address_id").addClass("is-valid");
        }
        if ($.trim($("#custom_broker_id").val()) == "") {
          $("#custom_broker_id").addClass("is-invalid");
        } else {
          $("#custom_broker_id").addClass("is-valid");
        }
      }
    });
  
    //This function add color to the rows
    function row_color() {
      $('.status:contains("ENTREGADA")').closest("tr").addClass("table-success");
      $('.status:contains("DESPACHADA")').closest("tr").addClass("table-warning");
      $('.status:contains("EN PATIO")').closest("tr").addClass("table-danger");
      $('.status:contains("INACTIVA")').closest("tr").addClass("table-danger");
      $('.status:contains("EN CRUCE")').closest("tr").addClass("table-primary");
      $('.status:contains("EN TRANSBORDO AA")')
        .closest("tr")
        .addClass("table-primary");
      $('.status:contains("EN AA")').closest("tr").addClass("table-primary");
      $('.status:contains("TRANSITO AA")')
        .closest("tr")
        .addClass("table-primary");
      $('.status:contains("CARGANDO")').closest("tr").addClass("table-primary");
      $('.status:contains("PROGRAMADA")').closest("tr").addClass("table-light");
      $('.currency:contains("MXN")').closest("tr").addClass("table-success");
      $('.currency:contains("USD")').closest("tr").addClass("table-primary");
    }
  
    load_data_loads_n();
  
    function load_data_loads_n(query) {
      $.ajax({
        url: "northbound_fetch.php",
        method: "POST",
        data: { query: query },
        success: function (data) {
          $("#northbound_result").html(data);
          row_color();
        },
      });
    }
    $("#northbound_search_text").keyup(function () {
      var search = $(this).val();
      if (search != "") {
        load_data_loads_n(search);
      } else {
        load_data_loads_n();
      }
    });
  
    load_data_carriers();
  
    function load_data_carriers(query) {
      $.ajax({
        url: "carriers_fetch.php",
        method: "POST",
        data: { query: query },
        success: function (data) {
          $("#carriers_result").html(data);
          row_color();
        },
      });
    }
    $("#carriers_search_text").keyup(function () {
      var search = $(this).val();
      if (search != "") {
        load_data_carriers(search);
      } else {
        load_data_carriers();
      }
    });
  
    load_data_customers();
  
    function load_data_customers(query) {
      $.ajax({
        url: "customers_fetch.php",
        method: "POST",
        data: { query: query },
        success: function (data) {
          $("#customers_result").html(data);
          row_color();
        },
      });
    }
    $("#customers_search_text").keyup(function () {
      var search = $(this).val();
      if (search != "") {
        load_data_customers(search);
      } else {
        load_data_customers();
      }
    });
  
    load_data_services();
  
    function load_data_services(query) {
      $.ajax({
        url: "services_fetch.php",
        method: "POST",
        data: { query: query },
        success: function (data) {
          $("#services_result").html(data);
          row_color();
        },
      });
    }
    $("#services_search_text").keyup(function () {
      var search = $(this).val();
      if (search != "") {
        load_data_services(search);
      } else {
        load_data_services();
      }
    });
  
    load_data_trailers();
  
    function load_data_trailers(query) {
      $.ajax({
        url: "trailers_fetch.php",
        method: "POST",
        data: { query: query },
        success: function (data) {
          $("#trailers_result").html(data);
          row_color();
        },
      });
    }
    $("trailers_search_text").keyup(function () {
      var search = $(this).val();
      if (search != "") {
        load_data_trailers(search);
      } else {
        load_data_trailers();
      }
    });
  });
  
  (() => {
    "use strict";
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip-orbis"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  })();
  
  $(".nav a")
    .filter(function () {
      return this.href === location.href;
    })
    .addClass("active");
  
  const getDatePickerTitle = (elem) => {
    // From the label or the aria-label
    const label = elem.nextElementSibling;
    let titleText = "";
    if (label && label.tagName === "LABEL") {
      titleText = label.textContent;
    } else {
      titleText = elem.getAttribute("aria-label") || "";
    }
    return titleText;
  };