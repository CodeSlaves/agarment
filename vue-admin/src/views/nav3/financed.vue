<template>
    <section>
        <el-input placeholder="转账人姓名:" class="text " v-model="names"></el-input>
        <el-cascader
                :options="options"
                v-model="selectedBankName"
                placeholder="请选择转账银行："
                @change="changeBankName">
        </el-cascader>
        <el-date-picker
                v-model="transferTime"
                type="date"
                @change="getStart"
                placeholder="请选择转账时间：">
        </el-date-picker>
        <el-button type="primary"  @click="SelectInfo" >搜索</el-button>
        <!--表格展示-->
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe  style="width:100%; margin-top: 15px">
            <el-table-column
                    prop="financedName"
                    label="转账人">
            </el-table-column>
            <el-table-column
                    prop="financedMoney"
                    label="转账金额">
            </el-table-column>
            <el-table-column
                    prop="borrowMoney"
                    label="还款金额">
            </el-table-column>
            <el-table-column
                    prop="financedTime"
                    label="转账日期">
            </el-table-column>
            <el-table-column
                    prop="financedBankName"
                    label="转出银行">
            </el-table-column>
            <el-table-column
                    prop="gatheringInBankName"
                    label="转入银行">
            </el-table-column>
            <el-table-column
                    prop="gatheringName"
                    label="收款姓名">
            </el-table-column>
            <el-table-column
                    prop="gatheringPhone"
                    label="收款手机号">
            </el-table-column>
            <el-table-column
                    prop="gatheringICard"
                    label="收款账号">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template scope="scope">
                    <el-button @click="deleteIndex(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
                 names:'',
                 selectedBankName:[],
                 options:[
                     {value:'中国人民银行',label:'中国人民银行'},
                     {value:'中国农业银行',label:'中国农业银行'},
                     {value:'中国工商银行',label:'中国工商银行'},
                     {value:'中国建设银行',label:'中国建设银行'},
                     {value:'中国光大银行',label:'中国光大银行'},
                     {value:'中国邮政银行',label:'中国邮政银行'},
                     {value:'中国银行',label:'中国银行'},
                     {value:'中国银行',label:'中国银行'},
                     {value:'华夏银行',label:'华夏银行'},
                     {value:'中信银行',label:'中信银行'},
                     {value:'交通银行',label:'交通银行'},
                     {value:'信用社',label:'信用社'},
                 ],
                 transferTime:'',
                 tableData:[
                     {
                         financedName:'张三',
                         financedMoney:'1500',
                         borrowMoney:'1500',
                         financedTime:'2017-01-10',
                         financedBankName:'中国光大银行',
                         gatheringInBankName:'中国银行',
                         gatheringName:'花花',
                         gatheringPhone:'171551515',
                         gatheringICard:'1512054651615648'
                     },{
                         financedName:'李四',
                         financedMoney:'1000',
                         borrowMoney:'1500',
                         financedTime:'2018-11-15',
                         financedBankName:'中国工商银行',
                         gatheringInBankName:'中国银行',
                         gatheringName:'花花',
                         gatheringPhone:'171551515',
                         gatheringICard:'1512054651615648'
                     },{
                         financedName:'张三',
                         financedMoney:'1500',
                         borrowMoney:'1500',
                         financedTime:'2017-01-10',
                         financedBankName:'中国光大银行',
                         gatheringInBankName:'中国银行',
                         gatheringName:'天坛',
                         gatheringPhone:'21454436',
                         gatheringICard:'1512054651615648'
                     },{
                         financedName:'王五',
                         financedMoney:'500',
                         borrowMoney:'1500',
                         financedTime:'2018-05-10',
                         financedBankName:'中国光大银行',
                         gatheringInBankName:'中国银行',
                         gatheringName:'小写',
                         gatheringPhone:'16511631',
                         gatheringICard:'1512054651615648'
                     },{
                         financedName:'赵茜',
                         financedMoney:'1500',
                         borrowMoney:'1500',
                         financedTime:'2017-01-10',
                         financedBankName:'中国光大银行',
                         gatheringInBankName:'中国银行',
                         gatheringName:'管管',
                         gatheringPhone:'1654165',
                         gatheringICard:'1512054651615648'
                     }
                 ],
                 currentPage:1,
                 pageSize:10,
                 total:14,
             }
         },mounted:function () {
            this.windowLoads();
        },methods:{
             //页面加载事件
            windowLoads:function(){

            },
            //银行选择事件
            changeBankName:function(value){

            },//借款时间选择事件
            getStart(val){
                this.transferTime=val;
            },//搜索事件
            SelectInfo:function () {
                let bankName=this.selectedBankName[0] === undefined ? "":this.selectedBankName[0];
                   var obj={
                       names:this.names,
                       selectedBankName:bankName,
                       transferTime:this.transferTime
                   }
                console.log(obj);
            },//分页事件
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
            },//删除的方法
            deleteIndex:function (row) {
                this.$confirm('此操作将会删除当前条数据，你确定继续吗？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then( ()=>{
                    this.$message({
                        type:'success',
                        message:'删除成功！',
                        showClose:true
                    });
                    console.log(row.gatheringPhone);
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'成功取消删除！！',
                        showClose:true
                    });
                })
            }
        }
    }
</script>

<style scoped>
.text{width: 200px;}
</style>