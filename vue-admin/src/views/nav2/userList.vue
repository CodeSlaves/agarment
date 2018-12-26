<template>
    <section>
        <!--表格展示-->
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe 
				 style="width:100%; margin-top: 15px">
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="100" >
            </el-table-column>
            <el-table-column
                    prop="idcard"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop=status
                    label="订单状态"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="borrowTime"
                    label="借款时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="repaymentTime"
                    label="还款时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="TorFalse"
                    label="是否主动还款"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="200">
                <template scope="scope">
                    <el-button @click="getIndex(scope.$index,scope.row)">详情</el-button>
                    <el-button @click="deleteIndex(scope.$index,scope.row)">删除</el-button>
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
                <el-button type="primary" @click.native="editSubmit">确定</el-button>
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
  export default{
      data(){
          return{
              detailForm:'',
              deleteForm:'',
              currentPage:1,
              pageSize:10,
              total:14,
              tableData:[
                  {
                      borrowTime:'2017-02-03',
                      name:'小天',
                      status:'已还款',
                      idcard:'169221669',
                      phone:'134056256456563',
                      address:'湖北省',
                      repaymentTime:'2018-02-03',
                      TorFalse:'是'
                  },{
                      borrowTime:'2017-08-09',
                      name:'小话',
                      status:'已还款',
                      idcard:'16925000',
                      phone:'1340561656563',
                      address:'济南省',
                      repaymentTime:'2018-02-03',
                      TorFalse:'否'
                  },{
                      borrowTime:'2017-1-21',
                      name:'小刚',
                      status:'已还款',
                      idcard:'169154125',
                      phone:'134056236563',
                      address:'东北省',
                      repaymentTime:'2018-02-03',
                      TorFalse:'是'
                  },{
                      borrowTime:'2017-02-03',
                      name:'小胡',
                      status:'已还款',
                      idcard:'169851525',
                      phone:'1340562325463',
                      address:'广东省',
                      repaymentTime:'2018-02-03',
                      TorFalse:'是'
                  },{
                      borrowTime:'2017-02-03',
                      name:'小花',
                      status:'已还款',
                      idcard:'1691646525',
                      phone:'135836563',
                      address:'湖南省',
                      repaymentTime:'2018-02-03',
                      TorFalse:'是'
                  },{
                      borrowTime:'2017-02-03',
                      name:'小天',
                      status:'待审核',
                      idcard:'16925',
                      phone:'134056256456563',
                      address:'湖北省',
                      repaymentTime:'2018-02-03',
                      TorFalse:'是'
                  },{
                      borrowTime:'2017-08-09',
                      name:'小话',
                      status:'已还款',
                      idcard:'16969456525',
                      phone:'1340561656563',
                      address:'济南省',
                      repaymentTime:'2018-02-03',
                      TorFalse:'是'
                  },{
                      borrowTime:'2017-1-21',
                      name:'小刚',
                      status:'已还款',
                      idcard:'169255215',
                      phone:'134056236563',
                      address:'东北省',
                      repaymentTime:'2018-12-15',
                      TorFalse:'否'
                  },{
                      borrowTime:'2017-02-03',
                      name:'小胡',
                      status:'已还款',
                      idcard:'16526526925',
                      phone:'1340562325463',
                      address:'广东省',
                      repaymentTime:'2018-5-13',
                      TorFalse:'是'
                  },{
                      borrowTime:'2017-02-03',
                      name:'小花',
                      status:'已还款',
                      idcard:'1689949925',
                      phone:'135836563',
                      address:'湖南省',
                      repaymentTime:'2018-12-03',
                      TorFalse:'是'
                  }
              ],
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
      },mounted:function () {
          this.windowLoads();
      }
       ,methods:{
          //页面加载事件
          windowLoads:function(){

          },
          handleSizeChange1: function(pageSize) {
              // 每页显示的条数
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
          //详情事件
          getIndex:function (index,row) {
              this.detailFormVisible=true;
              //获取用户的身份证号
              console.log(row.idcard);
          },
          //当用户点击确定时
          editSubmit:function () {
              this.detailFormVisible=false;
          },
          //删除事件
          deleteIndex:function (index,row) {
              // this.deleteFormVisible=true;
              this.$confirm('此操作将永久删除数据，是否继续？','提示',{
                  confirmButtonText:'确定',
                  cancelButtonText:'取消',
                  type:'warning'
              }).then(()=>{
                  this.$message({
                      type:'success',
                      message:'删除成功！',
                      showClose:true
                  });
                  console.log(row.idcard);
              }).catch(()=>{
                  this.$message({
                      type:'info',
                      message:'已取消删除！',
                      showClose:true
                  });
              })

          }
      }
  }
</script>
<style scoped>

</style>