<template>
    <div>
        <div>患者信息查询</div>
        <el-form :inline="true" :model="patient" class="demo-form-inline">
            <el-form-item label="病历号：">
            <el-input v-model="patient.caseNumber" size="mini" placeholder="病历号"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：">
                <el-date-picker
                        size="mini"
                        v-model="patient.startTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
                <el-date-picker
                        size="mini"
                        v-model="patient.endTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini">搜索</el-button>
            </el-form-item>
        </el-form>
        <div>患者信息确认</div>
        <el-form :inline="true" :model="patient" class="demo-form-inline">
            <el-form-item label="姓 名：">
                <el-input v-model="patient.caseNumber" size="mini" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：">
                <el-input v-model="patient.caseNumber" size="mini" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址：">
                <el-input v-model="patient.caseNumber" size="mini" placeholder="家庭住址"></el-input>
            </el-form-item>
        </el-form>
        <div>患者消费信息</div>
        <el-table
                :data="patientInfo"
                style="width: 100%">
            <el-table-column
                    prop="caseNumber"
                    label="病历号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="realName"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="消费名称">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价">
            </el-table-column>、
            <el-table-column
                    prop="amount"
                    label="数量">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="日期">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "PatientCosts",
        data(){
            return{
                patient:{
                    caseNumber:'',
                    startTime:'',
                    endTime:''
                },
                patientInfo:{
                    caseNumber:'',
                    realName:'',
                    name:'',
                    price:'',
                    amount:'',
                    createTime:''
                }
            }
        }
    }
</script>

<style scoped>

</style>