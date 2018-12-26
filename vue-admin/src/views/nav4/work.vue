<template>
   <section>
      <el-input placeholder="请输入姓名:" class="text " v-model="names"></el-input>
      <el-input placeholder="请输入手机号:" class="text " v-model="phones" ></el-input>
      <el-input placeholder="请输入身份证号:" class="text " v-model="idCrads" ></el-input>
      <el-input placeholder="请选择借款本金:" class="text " v-model="moneys" ></el-input>
      <el-cascader
              :options="options1"
              v-model="selectedProvince"
              placeholder="请选择省份："
               @change="getProvince">
      </el-cascader>
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
      <!--表格显示-->
      <el-table :data="tableData" style="width: 100%">
         <el-table-column type="expand">
            <template slot-scope="props">
               <el-form label-position="left" inline class="detialInfo">
                  <el-form-item label="姓名:">
                     <span>{{ props.row.name}}</span>
                  </el-form-item>
                  <el-form-item label="手机号:">
                     <span>{{ props.row.phone}}</span>
                  </el-form-item>
                  <el-form-item label="身份证号:">
                     <span>{{ props.row.idCard}}</span>
                  </el-form-item>
                  <el-form-item label="订单状态:">
                     <span>{{ props.row.status }}</span>
                  </el-form-item>
                  <el-form-item label="借款金额:">
                     <span>{{ props.row.money }}</span>
                  </el-form-item>
                  <el-form-item label="地址:">
                     <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="借款时间:">
                     <span>{{ props.row.borrowTime }}</span>
                  </el-form-item>
                  <el-form-item label="应还款时间:">
                     <span>{{ props.row.repayTime }}</span>
                  </el-form-item>
                  <el-form-item label="开户行:">
                     <span>{{ props.row.bankName }}</span>
                  </el-form-item>
                  <el-form-item label="银行卡号:">
                     <span>{{ props.row.bankCard}}</span>
                  </el-form-item>
               </el-form>
            </template>
         </el-table-column>
         <el-table-column label="身份证号" prop="idCard">
         </el-table-column>
         <el-table-column label="手机号" prop="phone">
         </el-table-column>
         <el-table-column label="借款本金" prop="money">
         </el-table-column>
         <el-table-column label="借款时间" prop="borrowTime">
         </el-table-column>
         <el-table-column label="应还款时间" prop="repayTime">
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
                phones:'',
                idCrads:'',
                moneys:'',
                selectedProvince:[],
                currentPage:1,
                pageSize:10,
                total:1,
                options1:[
                    {value:'湖南',label:'湖南'},
                    {value:'湖北',label:'湖北'},
                    {value:'广东',label:'广东'},
                    {value:'广西',label:'广西'},
                    {value:'河南',label:'河南'},
                    {value:'河北',label:'河北'},
                    {value:'山东',label:'山东'},
                    {value:'山西',label:'山西'},
                    {value:'江苏',label:'江苏'},
                    {value:'浙江',label:'浙江'},
                    {value:'江西',label:'江西'},
                    {value:'黑龙江',label:'黑龙江'},
                    {value:'新疆',label:'新疆'},
                    {value:'云南',label:'云南'},
                    {value:'贵州',label:'贵州'},
                    {value:'福建',label:'福建'},
                    {value:'吉林',label:'吉林'},
                    {value:'安徽',label:'安徽'},
                    {value:'四川',label:'四川'},
                    {value:'西藏',label:'西藏'},
                    {value:'宁夏',label:'宁夏'},
                    {value:'辽宁',label:'辽宁'},
                    {value:'青海',label:'青海'},
                    {value:'甘肃',label:'甘肃'},
                    {value:'陕西',label:'陕西'},
                    {value:'内蒙古',label:'内蒙古'},
                    {value:'台湾',label:'台湾'},
                    {value:'北京',label:'北京'},
                    {value:'上海',label:'上海'},
                    {value:'天津',label:'天津'}
                    ],
                tableData:[
                    {
                        name:'小天',
                        phone:'134056256456563',
                       idCard:'169165',
                       status:'已还清',
                       money:'2000',
                       address:'湖北省',
                       borrowTime:'2017-10-13',
                       repayTime:'2018-10-15',
                       bankName:'邮政银行',
                       bankCard:'16156461'
                    },{
                      name:'小天',
                      status:'已还清',
                      idCard:'169165',
                      phone:'134056256456563',
                      address:'湖北省',
                      money:'2000',
                      borrowTime:'2017-10-13',
                      repayTime:'2018-10-15',
                      bankName:'邮政银行',
                      bankCard:'16156461'
                   },{
                      name:'小天',
                      status:'已还清',
                      idCard:'169165',
                      phone:'134056256456563',
                      address:'湖北省',
                      money:'2000',
                      borrowTime:'2017-10-13',
                      repayTime:'2018-10-15',
                      bankName:'邮政银行',
                      bankCard:'16156461'
                   },{
                      name:'小天',
                      status:'已还清',
                      idCard:'169165',
                      phone:'134056256456563',
                      address:'湖北省',
                      money:'2000',
                      borrowTime:'2017-10-13',
                      repayTime:'2018-10-15',
                      bankName:'邮政银行',
                      bankCard:'16156461'
                   }
                ],
               repaymentTimes:'',
               brrowTimes:''
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
                let pro=this.selectedProvince[0] === undefined ? "":this.selectedProvince[0];
                var obj={
                   names:this.names,
                   phones:this.phones,
                   idcards:this.idCrads,
                   moneys:this.moneys,
                   provinces:pro,
                   brrowTimes: this.brrowTimes,
                   repaymentTimes:this.repaymentTimes,
                   currentPage:this.currentPage,
                   pageSize:this.pageSize
                };
               console.log(obj);
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
            //省份选择
            getProvince:function(val){
              this.selectedProvince=val;
            }
            ,//获取时间的格式  yyyy-MM-dd
            //获取借款时间
            getStart(val){
                this.brrowTimes=val;
            },
            ///获取还款时间
            getEnd(val){
                this.repaymentTimes=val;
            }
        }
    }
</script>
<style scoped>
   .text{width: 200px; height: 25px; margin: 10px; padding: 5px}
   .detialInfo{width: 100%;}
   .detialInfo span{color: red}
</style>
