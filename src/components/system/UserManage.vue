<template>
    <div>
        <el-input  class="search" v-model="form.name" size="mini" placeholder="请输入登录名或姓名"></el-input>
        <el-button type="primary" @click="onSubmit" size="mini" class="el-icon-view">查询用户</el-button>
        <el-button type="primary"  size="mini" class="el-icon-edit" @click="addFormBtn">新增用户</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="登录名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="realname"
                    label="真实姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="usertype"
                    label="用户类别"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="constantname"
                    label="医生职称"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="deptname"
                    label="所在科室"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="registname"
                    label="挂号级别"
                    width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                :visible.sync="dialogVisible1"
                width="50%"
                :before-close="handleClose">
            <h3 class="title">新增用户</h3>
            <el-form ref="form" :model="addForm" label-width="80px" >
                <el-form-item  >
                    登录名：<el-input class="input" v-model="addForm.name" size="mini"></el-input>
                    密码：<el-input class="input" v-model="addForm.password" size="mini"></el-input>
                </el-form-item>
                <el-form-item >
                真实姓名：<el-input class="input" v-model="addForm.realName" size="mini"></el-input>
                所在科室: <el-select v-model="addForm.deptName" placeholder="请选择">
                         <el-option
                                v-for="item in deptNameoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                         </el-option>
                         </el-select>
                </el-form-item>
                <el-form-item >
                    用户类别:<el-select v-model="addForm.userType" placeholder="请选择">
                            <el-option
                            v-for="item in usertypeoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                            </el-select>
                    医生职称:  <el-select size="mini" v-model="addForm.constantName" placeholder="请选择活动区域">
                               <el-option
                              v-for="item in constantnameoptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                              </el-select>
                </el-form-item>
                <el-form-item >
                    挂号级别:<el-select size="mini" v-model="addForm.registName" placeholder="请选择活动区域">
                            <el-option
                            v-for="item in registnameoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                            </el-select>
                    是否参与排班：<el-radio v-model="addForm.IsScheduling" label="1">是</el-radio>
                                <el-radio v-model="addForm.IsScheduling" label="2">否</el-radio>
                </el-form-item>


            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="dialogVisible1 = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveAddForm" size="mini">保存</el-button>
                <el-button type="primary" @click="clear1" size="mini">清空</el-button>
            </span>
        </el-dialog>

        <el-dialog
                :visible.sync="dialogVisible2"
                width="50%"
                :before-close="handleClose">
            <h3 class="title">修改用户</h3>
            <el-form ref="form" :model="updateForm" label-width="80px" >
                <el-form-item  >
                    登录名：<el-input class="input" v-model="updateForm.name" size="mini"></el-input>
                    密码：<el-input class="input" v-model="updateForm.password" size="mini"></el-input>
                </el-form-item>
                <el-form-item >
                    真实姓名：<el-input class="input" v-model="updateForm.realName" size="mini"></el-input>
                    所在科室: <el-select v-model="updateForm.deptName" placeholder="请选择">
                    <el-option
                            v-for="item in deptNameoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item >
                    用户类别:<el-select v-model="updateForm.userType" placeholder="请选择">
                    <el-option
                            v-for="item in usertypeoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                    医生职称:  <el-select size="mini" v-model="updateForm.constantName" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in constantnameoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item >
                    挂号级别:<el-select size="mini" v-model="updateForm.registName" placeholder="请选择活动区域">
                    <el-option
                            v-for="item in registnameoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                    是否参与排班：<el-radio v-model="updateForm.IsScheduling" label="1">是</el-radio>
                    <el-radio v-model="updateForm.IsScheduling" label="2">否</el-radio>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="dialogVisible2 = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveAddForm" size="mini">保存</el-button>
                <el-button type="primary" @click="clear2" size="mini">清空</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data(){
            return{
                form:{
                    name:''
                },
                tableData: [],
                pageNum : 1,
                pageSize: 5,
                total:0,
                dialogVisible1: false,
                dialogVisible2: false,
                addForm:{
                    name:'',
                    password:'',
                    realName:'',
                    deptName:'',
                    userType:'',
                    constantName:'',
                    registName:'',
                    IsScheduling:'1',
                },
                updateForm:{
                    id:'',
                    name:'',
                    password:'',
                    realName:'',
                    deptName:'',
                    userType:'',
                    constantName:'',
                    registName:'',
                    IsScheduling:'1',
                },
                deptNameoptions:[],
                usertypeoptions:[{
                    value: '1',
                    label: '医院管理员'
                }, {
                    value: '2',
                    label: '挂号收费员'
                }, {
                    value: '3',
                    label: '门诊医生'
                }, {
                    value: '4',
                    label: '医技医生'
                }, {
                    value: '5',
                    label: '药房操作员'
                },{
                        value: '6',
                        label: '财务管理员'
                    }],
                constantnameoptions:[],
                registnameoptions:[]
            }
        },
        mounted(){
            this.initUser();
        },
        methods:{
            initUser(){
                let url='/system/searchUser?pageNum='+this.pageNum+'&pageSize='+this.pageSize;
                this.getRequest(url).then(resp=>{
                        this.tableData=resp.list;
                    this.total=resp.total;
                })
            },
            //点击查询用户按钮
            onSubmit(){
                if(this.form.name==''||this.form.name.trim()==''){
                      this.$message('请正确填写名称');
                }else{
                    let url='/system/searchUser?name='+this.form.name+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize;
                    this.getRequest(url).then(resp=>{
                           this.tableData=resp.list;
                           this.total=resp.total;
                    })
                }
            },
            handleDelete(row){
                this.delRequest('/system/delUser/'+row.id).then(resp=>{
                    if(resp){
                        this.$message('用户删除成功');
                        this.initUser();
                    }
                })
            },
            //点击编辑按钮
            handleEdit(row){
                this.dialogVisible2=true;
                this.updateForm.id=row.id;
                this.updateForm.name=row.name;
                this.updateForm.password=row.password;
                this.updateForm.realName=row.realName;
                this.updateForm.constantName=row.constantName;
                this.updateForm.deptName=row.deptName;
                this.updateForm.userType=row.userType;
                this.updateForm.registName=row.registName;
                this.putRequest('/system/updateUser',this.updateForm).then(resp=>{
                   if(resp){
                       this.$message('修改用户成功');
                   }
                })
            },
            clear1(){
                this.addForm.name='';
                this.addForm.password='';
                this.addForm.realName='';
                this.addForm.constantName='';
                this.addForm.deptName='';
                this.addForm.userType='';
                this.addForm.registName='';
                this.addForm.IsScheduling='1';
            },
            clear2(){
                this.updateForm.name='';
                this.updateForm.password='';
                this.updateForm.realName='';
                this.updateForm.constantName='';
                this.updateForm.deptName='';
                this.updateForm.userType='';
                this.updateForm.registName='';
                this.updateForm.IsScheduling='1';
            },
            //点击保存按钮
            saveAddForm(){
                this.dialogVisible1=false;
                this.postRequest('/system/addForm',this.addForm).then(resp=>{
                    if(resp){
                        this.$message('增加用户成功！')
                    }
                });
            },
            //点击增加按钮
            addFormBtn(){
                this.dialogVisible1=true;
                this.getDeptName();
                this.getConstantname();
                this.getRegistName();
            },
            //获取医生职称列表
            getDeptName(){
                this.getRequest('/system/getDeptName').then(resp=>{
                    this.deptNameoptions=resp;
                })
            },
            //获取 医生职称 列表
            getConstantname(){
                this.getRequest('/system/getConstantname').then(resp=>{
                    this.constantnameoptions=resp;
                })
            },
            //获取 获取挂号级别列表
            getRegistName(){
                this.getRequest('/system/getRegistName').then(resp=>{
                    this.registnameoptions=resp;
                })
            }
        }
    }
</script>

<style scoped>
    .search{
        width: 20%;
    }
    .input{
        width: 100px !important;
    }
    .title{
        text-align: center;
    }
    .dialog-footer{
        margin-right: 150px;

    }
</style>