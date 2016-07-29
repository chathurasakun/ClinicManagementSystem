<?php
require('hidden_right.php');
?>

<section class="content-header" >
  <h1>Prescription History</h1> 
  <ol class="breadcrumb">
    <li><a href="http://demo-hms.eu5.org/app/dashboard"><i class="fa fa-dashboard"></i> Home</a></li>
    <li><a href="#">Patient Appointment</a></li>
    <li class="active">Add Appointment</li>
  </ol>
</section>

<style>
.prescription_history{
  display: block;
}
</style>

<div class="prescription_history">
	<!-- Main content -->
  <section class="content">


   <div class="row">
    <div class="col-md-12">

     <div class="box">
      <form class="form-search" method="post" action="http://demo-hms.eu5.org/app/appointment/addAppointmentList">
        <div class="box-header">
          <h3 class="box-title"><a href="http://demo-hms.eu5.org/app/appointment/addPatient" class="btn btn-primary"><i class="fa fa-plus"></i> Add New Patient</a></h3>

          <div class="box-tools">
            <div class="input-group">
              <input type="text" name="search" id="search" class="form-control input-sm pull-right" style="width: 150px;" placeholder="Search"/>
              <div class="input-group-btn">
                <button class="btn btn-sm btn-default" name="btnSearch" id="btnSearch" type="submit"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>

        </div><!-- /.box-header -->
      </form>
      <div class="box-body table-responsive no-padding">

        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>Date</th><th>Drug</th><th>Dosage</th><th>Period</th><th>Doctor</th><th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>2015-09-09</td><td>Paracetomol</td><td>20mg</td><td>4 weeks</td><td>Nisali De Silva</td><td>In Progress</td>
            </tr>
          </tbody>
        </table>                                
        </div>
        
        <div class="box-footer clearfix">
          <ul class="pagination pagination no-margin pull-right"><li class="active"><a href="">1</a></li><li class="page"><a href="http://demo-hms.eu5.org/app/appointment/addAppointmentList/10">2</a></li><li class="page"><a href="http://demo-hms.eu5.org/app/appointment/addAppointmentList/20">3</a></li><li class="next page"><a href="http://demo-hms.eu5.org/app/appointment/addAppointmentList/10">Next &rarr;</a></li><li class="next page"><a href="http://demo-hms.eu5.org/app/appointment/addAppointmentList/50">Last &raquo;</a></li></ul><!--pagination-->                               
           </div>
        </div>
      </div>
    </div>


  </section><!-- /.content -->


</div>
<!--End Of Prescription History-->