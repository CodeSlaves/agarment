<template>
	<section>
		<el-input placeholder="请输入姓名:" class="text " v-model="names"></el-input>
		<el-input placeholder="请输入手机号:" class="text " v-model="phones" ></el-input>
		<el-input placeholder="请输入身份证号:" class="text " v-model="idCrads" ></el-input>
		<el-input placeholder="请选择借款本金:" class="text " v-model="moneys" ></el-input>
		<el-date-picker
				v-model="brrowTimes"
				type="date"
				@change="getStart"
				placeholder="请选择开始借贷时间：">
		</el-date-picker>
		<el-date-picker
				v-model="repaymentTimes"
				type="date"
				@change="getEnd"
				placeholder="请选择应还款时间：">
		</el-date-picker>
		<el-button type="primary"  @click="SelectInfo" >搜索</el-button>
		 <!--表格展示-->
		<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe  style="width:100%; margin-top: 15px">
			<el-table-column
					prop="id"
					label="用户id"
					width="100">
			</el-table-column>
			<el-table-column
					prop="name"
					label="姓名"
			       width="100">
			</el-table-column>
			<el-table-column
					prop="sex"
					label="性别">
			</el-table-column>
			<!--<el-table-column-->
					<!--prop=status-->
					<!--label="订单状态"-->
					<!--width="100">-->
			<!--</el-table-column>-->
			<el-table-column
					prop="phone"
					label="手机号">
			</el-table-column>
			<!--<el-table-column-->
					<!--prop="address"-->
					<!--label="地址">-->
			<!--</el-table-column>-->
			<el-table-column
					prop="borrowMoney"
					label="贷款金额"
					width="200">
			</el-table-column>
			<el-table-column
					prop="repaymentTime"
					label="应还款时间"
					width="200">
			</el-table-column>
			<el-table-column
					prop="BankName"
					label="银行卡名称"
					width="200">
			</el-table-column>
			<el-table-column
					prop="BankCard"
					label="银行卡号"
					width="200">
			</el-table-column>
			<el-table-column
					label="操作"
					width="200">
				<template scope="scope">
					<el-button @click="getIndex(scope.$index,scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--查看详情-->
		<el-dialog title="详情页面" v-model="detailFormVisible" :close-on-click-modal="false" class="editDialogStyle">
			<el-form :model="detailForm" label-width="80px"  ref="detailForm" class="detailFormStyle">
				<el-form-item label="姓名:" prop="formName">
					<el-input v-model="detailForm.formName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="身份证号:" prop="formID">
					<el-input v-model="detailForm.formID" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="订单状态:" prop="formState">
					<el-input v-model="detailForm.formState" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="手机号:" prop="formPhone">
					<el-input v-model="detailForm.formPhone" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="借款金额:" prop="formMoney">
					<el-input v-model="detailForm.formMoney" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="地址:" prop="formAddress">
					<el-input v-model="detailForm.formAddress" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="借款时间:" prop="formBrrowTime">
					<el-input v-model="detailForm.formBrrowTime" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="还款时间:" prop="formRepaymentTime">
					<el-input v-model="detailForm.formRepaymentTime" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="开户行:" prop="formBankName">
					<el-input v-model="detailForm.formBankName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="银行卡号:" prop="formBankID">
					<el-input v-model="detailForm.formBankID" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="Submit">确定</el-button>
			</div>
		</el-dialog>
		<!--分页显示-->
		<div class="paginationClass">
			<el-pagination
					@size-change="handleSizeChange1"
					@current-change="handleCurrentChange1"
					:current-page="currentPage"
					:page-sizes="[10,20,30,40]"
					:page-size=pageSize
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
			</el-pagination>
			<!--:page-sizes="[5,6,7,8]"     选择下拉框要显示的页数
                page-size=n   当前页面要显示的n条数据
                total  显示总共的数据
             -->
		</div>
	</section>
</template>

<script>
	 export default {
	     data(){
	         return{
                 names:"",
                 phones:"",
                 idCrads:'',
                 moneys:'',
                 brrowTimes:'',
                 repaymentTimes:'',
                 currentPage:1,
                 pageSize:10,
                 total:14,
                 tableData:[{
                 	id:'1561',
					 name:'花花',
					 sex:'女',
					 phone:'165465',
					 borrowMoney:'2000',
					 repaymentTime:'2017-10-15',
					 BankName:'邮政',
					 BankCard:'15616'
				 }],
                 detailFormVisible:false,
                 detailForm:{
                     formName:'',
                     formID:'',
                     formState:'',
                     formPhone:'',
                     formMoney:'',
                     formAddress:'',
                     formBrrowTime:'',
                     formRepaymentTime:'',
                     formBankName:'',
                     formBankID:''
                 }
			 }
		 },mounted:function(){
	         this.windowLoads();
		 },methods:{
	         //页面加载事件
			 windowLoads:function(){
                // $.ajax({
				// 	url:'http:// eurekaserver:port/XED-SERVICE-COLLECTION/saveCollectionInfo',
				// 	dataType:'json',
				// 	type:'post',
				// 	success:function (data) {
				// 		console.log(data);
				// 	}
				// })
             },
			 //点击搜索的事件
             SelectInfo:function(){
                 var obj={
                     names:this.names,
                     phones:this.phones,
                     idCrads:this.idCrads,
                     moneys:this.moneys,
                     borrowTimes:this.brrowTimes,
                     repaymentTimes:this.repaymentTimes,
                     currentPage:this.currentPage,
                     pageSize:this.pageSize
                 };
                 console.log(obj);
             },
             //地区选择的事件
             handleChange:function(value){

             },
             handleSizeChange1: function(pageSize) { // 每页显示的条数
                 this.pageSize = pageSize;
                 this.handleCurrentChange1(this.currentPage);
             },
             handleCurrentChange1: function(currentPage) {//  页码的切换
                 this.currentPage = currentPage;
                 this.currentChangePage(this.tableData,currentPage)

             },
             //分页方法（重点）
             currentChangePage(list,currentPage) {
                 let from = (currentPage - 1) * this.pageSize;
                 let to = currentPage * this.pageSize;
                 this.tempList = [];
                 for (; from < to; from++) {
                     if (list[from]){
                         this.tempList.push(list[from]);
                     }
                 }
             },
             getStart(val){
                 this.brrowTimes=val;
             },    //获取时间的格式  yyyy-MM-dd
             getEnd(val){
                 this.repaymentTimes=val;
             },
             //详情事件
             getIndex:function (index,row) {
                 this.detailFormVisible=true;
                 //获取用户的身份证号
                 console.log(row.idcard);
             },
             //当用户点击确定时
             Submit:function () {
                 this.detailFormVisible=false;
             }
		 }
	 }
</script>
<style scoped>
	.text{width: 200px; height: 25px; margin: 10px; padding: 5px}
	.editDialogStyle{text-align: center; color: #50bfff}
	.detailFormStyle{width: 400px; margin: 0 auto}
</style>
