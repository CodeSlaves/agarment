<template>
    <section>
        姓名：<el-input v-model="names" class="inputStyle"></el-input>
        手机号:<el-input v-model="phones" class="inputStyle"></el-input>
        <el-button type="primary" @click="selectInfo">查询</el-button>
        <!--<el-button type="danger" @click="addInfo">增加</el-button>-->
        <!--用户信息展示-->
        <el-table :data="tabledate" stripe style="width: 100%;margin-top: 10px" >
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="idCard"
                    label="身份证号">
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
                    label="借款时间">
            </el-table-column>
            <el-table-column
                    prop="repaymentTime"
                    label="应还款时间">
            </el-table-column>
            <el-table-column
                    prop="overlineDays"
                    label="逾期天数">
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="借款本金">
            </el-table-column>
            <el-table-column
                    prop="repaymentMoney"
                    label="应还金额">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <!--<el-button type="text"  @click="editIndex(scope.row)">编辑</el-button>-->
                    <el-button type="text"  @click="deleteIndex(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!--分页展示-->
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
        <!--添加黑名单-->
        <!--<el-dialog v-model="addFormVisible" title="新增黑名单" :close-on-click-modal="false" class="addFormStyle">-->
            <!--<el-form v-model="addForm" >-->
                <!--<el-form-item prop="formName" label="姓名：">-->
                    <!--<el-input v-model="addForm.formName"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="formCard" label="身份证号：">-->
                    <!--<el-input v-model="addForm.formCard"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="formPhone" label="手机号：">-->
                    <!--<el-input v-model="addForm.formPhone"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="formAddress" label="地址信息：">-->
                    <!--<el-input v-model="addForm.formAddress"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="formBorrowTime" label="借款时间">-->
                    <!--<el-input v-model="addForm.formBorrowTime"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="formRemark" label="备注">-->
                    <!--<el-input v-model="addForm.formRemark"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="addSure">确定</el-button>-->
                    <!--<el-button type="primary" @click="addCancle">取消</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</el-dialog>-->
        <!--&lt;!&ndash;编辑黑名单&ndash;&gt;-->
         <!--<el-dialog v-model="editFormVisible" title="编辑黑名单" :close-on-click-modal="false">-->
             <!---->
         <!--</el-dialog>-->
    </section>
</template>

<script>
    export default {
        data(){
            return{
                names:'',
                phones:'',
                tabledate:[{
                    name:'方颜',
                    idCard:'26261',
                    phone:'0541215',
                    address:'湖北省',
                    borrowTime:'2017-11-10',
                    repaymentTime:'2018-10-15',
                    overlineDays:'5',
                    money:'2000',
                    repaymentMoney:'2500',
                    remark:''
                }],
                currentPage:1,
                pageSize:10,
                total:14,
                // addFormVisible:false,
                // addForm:{
                //     formName:'',
                //     formCard:'',
                //     formPhone:'',
                //     formAddress:'',
                //     formBorrowTime:'',
                //     formRemark:''
                // }
            }
        },
        mounted:function(){
            this.windowLoad();
        },
        methods:{
            //页面加载的方法
            windowLoad:function(){

            },
            handleSizeChange1: function(pageSize) {
                // 每页显示的条数
                this.pageSize = pageSize;
                this.handleCurrentChange1(this.currentPage);
            },
            handleCurrentChange1: function(currentPage) {//  页码的切换
                this.currentPage = currentPage;
                this.currentChangePage(this.tabledate,currentPage)

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
            //查询的方法
            selectInfo:function(){
               //获取文本框的值
                var obj={
                    name:this.names,
                    phone:this.phones,
                    currentpage:this.currentPage,
                    pagesize:this.pageSize
                };
                console.log(obj);
            },

            // //增加的方法
            // addInfo:function(){
            //      this.addFormVisible=true;
            // },
            // //确认增加
            // addSure:function(){
            //     this.$message({
            //         type:'success',
            //         message:'增加成功！！'
            //     });
            //     this.addFormVisible=false;
            // },
            // //取消确认增加
            // addCancle:function(){
            //     this.$message({
            //         type:'success',
            //         message:'成功取消！'
            //     });
            //    this.addFormVisible=false;
            // },
            // //编辑的方法
            // editIndex:function () {
            //     //获取用户的身份证号
            //     //将相应的信息显示在对应的文本框中
            //     //this.text=date.name
            //     //进行编辑
            // },
            //删除的方法
            deleteIndex:function (row) {
                  this.$confirm('确认删除吗','提示',{
                      confirmButtonText:'确定',
                      cancelButtonText:'取消',
                      type:'warning'
                  }).then(()=>{
                      this.$message({
                          type:'success',
                          message:'成功删除！！'
                      });
                      console.log(row.idCard);
                  }).catch(()=>{
                      this.$message({
                          type:'success',
                          message:'成功取消！'
                      })
                  });
            }
        }
    }
</script>

<style scoped>
    .inputStyle{width: 200px;}
    .addFormStyle{ text-align: center;margin-left: 800px ;width: 50%; }
</style>