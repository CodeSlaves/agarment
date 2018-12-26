<template>
   <section>
       <el-form :model="ruleForm2" class="demo-ruleForm">
           <h3 class="title">修改密码</h3>
           <el-form-item prop="account">
               <el-input type="text" v-model="ruleForm2.user"  placeholder="请输入账号" class="inputStyle"></el-input>
           </el-form-item>
           <el-form-item prop="checkPass">
               <el-input type="password" v-model="ruleForm2.Pass"  placeholder="请输入原密码" class="inputStyle"></el-input>
           </el-form-item>
           <el-form-item prop="checkPass">
               <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请输入现密码" class="inputStyle"></el-input>
           </el-form-item>
           <el-form-item prop="checkPass">
               <el-input type="password" v-model="ruleForm2.surePass"  placeholder="请输入确定密码" class="inputStyle"></el-input>
           </el-form-item>
           <el-form-item style="float: left">
               <el-button type="success" style="width:80px; margin: 10px 10px 10px 200px" @click="check" >确定</el-button>
           </el-form-item>
           <el-form-item  style="float: left">
               <el-button type="success" style="width:80px; margin: 10px" @click="cancels" >取消</el-button>
           </el-form-item>
       </el-form>
   </section>
</template>
<script>
    export default {
        data(){
            return{
                ruleForm2:{
                    user:'',
                    Pass:'',
                    checkPass:'',
                    surePass:''
            }
            }
        },methods:{
              check:function () {
                  this.$message({
                      type:'success',
                      message:'密码重置成功！'
                  })
              },
            cancels:function () {
                this.ruleForm2.user="";
                this.ruleForm2.Pass="";
                this.ruleForm2.checkPass="";
                this.ruleForm2.surePass="";
                this.$message({
                    type:'success',
                    message:'取消修改密码！'
                })
            }
        }

    }
</script>

<style scoped>
    .demo-ruleForm{width: 600px; margin: 0 auto; text-align: center}
    .inputStyle{width: 500px; height: 30px}
</style>