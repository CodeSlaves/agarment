<template>
    <section>

        <el-date-picker
                v-model="brrowTimes"
                type="date"
                @change="getStart"
                placeholder="请选择开始借贷时间：">
        </el-date-picker>

        <el-button type="primary"  @click="SelectInfo" >搜索</el-button>

        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe
                  style="width:500px; margin-top: 15px">
            <el-table-column
                    prop="date"
                    label="时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="click"
                    label="链接点击">
            </el-table-column>
            <el-table-column
                    prop="load"
                    label="app下载"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="二维码"
                    width="100">
            </el-table-column>
        </el-table>
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
                brrowTimes:'',
                tableData:[],
                currentPage:1,
                pageSize:10,
                total:1,
            }
        },
        mounted:function () {
            this.windowLoads();
        }
        ,
        methods:{
            //页面加载事件
            windowLoads:function(){
            },
            //点击搜索的事件
            SelectInfo:function(){
                var obj={
                    time:this.brrowTimes,
                    currentpage:this.currentPage,
                    pagesize:this.pageSize
                };
                console.log(obj);
            }
           ,
            //获取借款时间
            getStart(val){
                this.brrowTimes=val;
            },
            // 每页显示的条数
            handleSizeChange1: function(pageSize) {
                this.pageSize = pageSize;
                this.handleCurrentChange1(this.currentPage);
            },
            //  页码的切换
            handleCurrentChange1: function(currentPage) {
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
        }
    }
</script>
<style scoped>
    .detialInfo span{color: red}
</style>
