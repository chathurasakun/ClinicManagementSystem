var warning = false;
var objecto = {
	"inventory_data"    : []
};
var dataO = null;
var dataE = null;
var table;

function saveStock(){
	p_code   = $("#p_code").val();
	p_name   = $("#p_name").val();
	formula  = $("#formula").val();
	dose     = $("#dose").val();
	batch_no = $("#batch_no").val();
	quantity = $("#quantity").val();
	expiry   = $("#expiry").val();

	if(p_code === "")
		showMessage("Product Code Required");
	
	if(p_name === "")
		showMessage("Product Name Required");

	if(batch_no === "")
		showMessage("Batch Number Required");

	if(quantity === "")
		showMessage("Quantity Required");

	if(expiry === "")
		showMessage("Expiry Date Required");

	if(warning){
		$("#alert").attr("class", "alert alert-danger alert-dismissable");
		$("#alert").show(1000).delay(5000).hide(1000);
		$('#err_msg').html("");
		return;
	} else{
		objecto.inventory_data.push({
			"date"     : getDate(),
			"p_code"   : p_code,
			"p_name"   : p_name,
			"formula"  : formula,
			"dose"     : dose,
			"batch_no" : batch_no,
			"quantity" : quantity,
			"expiry"   : expiry
		});

		$.ajax({
			type: "POST",
			url: "../patient/tb/register",
			data: JSON.stringify(objecto),
			success: function( data, textStatus, jQxhr ){
				$("#err_msg").html("Stock added successfully");
				$("#alert").attr("class", "alert alert-success alert-dismissable");
				$("#p_code").val("");
				$("#p_name").val("");
				$("#formula").val("");
				$("#dose").val("");
				$("#batch_no").val("");
				$("#quantity").val("");
				$("#expiry").val("");
				$("#alert").show(1000).delay(5000).hide(1000);
				$('#modal_stock').modal('hide');
				addToTable(objecto.inventory_data, 'tble_stock');
				objecto.inventory_data = [];
			},
			error: function( jqXhr, textStatus, errorThrown ){
				$("#err_msg").html("An Error Occurred");
				$("#alert").attr("class", "alert alert-danger alert-dismissable");
			}
		});
	}
}

function showMessage(message){
	msg = $('#err_msg').html() + message + '<br>';
	$('#err_msg').html(msg);
	warning = true;
}

function addToTable(arr, tName){
	table = document.getElementById(tName);

	for(i = 0; i < arr.length; i++){
		var row   = table.insertRow(table.rows.length);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		var cell7 = row.insertCell(6);
		var cell8 = row.insertCell(7);
		//var cell9 = row.insertCell(8);

		cell1.innerHTML = arr[i]['date'] + cell1.innerHTML;
		cell2.innerHTML = arr[i]['p_code'] + cell2.innerHTML;
		cell3.innerHTML = arr[i]['p_name'] + cell3.innerHTML;
		cell4.innerHTML = arr[i]['formula'] + cell4.innerHTML;
		cell5.innerHTML = arr[i]['dose'] + cell5.innerHTML;
		cell6.innerHTML = arr[i]['batch_no'] + cell6.innerHTML;
		cell7.innerHTML = arr[i]['quantity'] + cell7.innerHTML;
		cell8.innerHTML = arr[i]['expiry'] + cell8.innerHTML;
		//id2 = '<a href="#">Edit</a>&nbsp|&nbsp;<a href="#" class="delete">Remove</a>';
		//cell9.innerHTML = id2 + cell9.innerHTML;
	}
}

function loadStock(){
	if(dataO === null){
		$.ajax({
			type: "GET",
			url: "../inventory/getdata",
			success: function( data, textStatus, jQxhr ){
				window.dataO = JSON.parse(data);
				if(dataO != null && dataO.length > 0)
					addToTable(dataO, 'tble_stock');
			},
			error: function( jqXhr, textStatus, errorThrown ){
				
			}
		});
	} else
		addToTable(dataO, 'tble_stock');
}

function loadExpiryStock(){
	if(dataE === null){
		$.ajax({
			type: "GET",
			url: "../inventory/getdata/expiry",
			success: function( data, textStatus, jQxhr ){
				window.dataE = JSON.parse(data);
				if(dataE != null && dataE.length > 0){
					addToTable(dataE, 'expire_stock');
				}
			},
			error: function( jqXhr, textStatus, errorThrown ){
				
			}
		});
	} else
		addToTable(dataE, 'expire_stock');
}

function loadProductItem() {
	
	if(dataE === null){
		$.ajax({
			type: "GET",
			url: "../inventory/getdata/product",
			success: function( data, textStatus, jQxhr ){
				dataE = JSON.parse(data);
				if(dataE != null && dataE.length > 0)
					addToTableProduct(dataE);
			},
			error: function( jqXhr, textStatus, errorThrown ){
				
			}
		});
	} else
		addToTableProduct(dataP);
}

function addToTableProduct(dataX){
	table = document.getElementById('product_item');
	arr = dataX;
	console.log(dataX.length);
	for(i = 0; i < arr.length; i++){
		var row   = table.insertRow(table.rows.length);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		//var cell5 = row.insertCell(4);

		cell1.innerHTML = arr[i]['p_code'] + cell1.innerHTML;
		cell2.innerHTML = arr[i]['p_name'] + cell2.innerHTML;
		cell3.innerHTML = arr[i]['formula'] + cell3.innerHTML;
		cell4.innerHTML = arr[i]['brand_name'] + cell4.innerHTML;
		//id2 = '<a href="#">View Product</a>';
		//cell5.innerHTML = id2 + cell5.innerHTML;
	}
}

function addProduct() {
	var formData = new FormData();

	if($("#prod_image")[0].files[0]) {
		formData.append('file', $("#prod_image")[0].files[0]);

		$.ajax({
			url: '../upload/product',
			type: 'POST',
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			success: function(data, textStatus, jqXHR)
			{ 
				addInformation(data);
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				$("#err_msg2").html("Operation Failed");
            	$("#alert2").attr('class', 'alert alert-danger alert-dismissable');
            	$("#alert2").show(1000).delay(5000).hide(1000);
			}
		});
	} else {
		addInformation("");
	}
}

function addInformation(data) {
	name = $("#prod_name").val();
    code = $("#prod_code").val();
    form = $("#prod_form").val();
    cat = $("#medicine_cat option:selected").html();
    note = $("#note").val();

    objectO = {"inventory_product" : []};

    objectO.inventory_product.push({
    	"name"        : name,
    	"code"        : code,
    	"formulation" :form,
    	"category"    : cat,
    	"note"        : note,
    	"path"        : data
    });

    $.ajax({
        url: '../patient/tb/register',
        type: 'POST',
        data: JSON.stringify(objectO),
        success: function(data, textStatus, jqXHR)
        {
        	$("#err_msg2").html("Product Added Successfully");
            $("#alert2").attr('class', 'alert alert-success alert-dismissable');
            $("#alert2").show(1000).delay(5000).hide(1000);
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
        	$("#err_msg2").html("Operation Failed");
            $("#alert2").attr('class', 'alert alert-danger alert-dismissable');
            $("#alert2").show(1000).delay(5000).hide(1000);
        }
    });
}



	
