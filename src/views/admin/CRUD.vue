<template>
    <header>
        <h1>{{ pageHeader }}</h1>
    </header>
    <Alert :msg="alertMessage" :show="showAlert" ref="alertRef"></Alert>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <router-link to="/admin" class="back">←Back</router-link>
    <form>
        <div class="form-group" v-if="pageSettings['fields']['name']">
            <label for="text">Name</label> 
            <input id="text" name="text" v-model="inputName" type="text" class="form-control">
        </div>
        <div class="form-group" v-if="pageSettings['fields']['price']">
            <label for="text">Price</label> 
            <input id="text" name="text" v-model="inputPrice" type="text" class="form-control">
        </div>
        <div class="form-group" v-if="pageSettings['fields']['parent_category']">
            <label class="label">Parent Category</label> 
            <div>
                <select id="select" name="select" class="custom-select" v-model="inputParentCategory">
                    <option>--Choose--</option>
                    <option v-for="(item, index) in parentCategories" :key="index" :value="item.id">{{ item.name }}</option>
                </select>
            </div>
        </div>
        <div class="form-group" v-if="pageSettings['fields']['category']">
            <label class="label">Category</label> 
            <div>
                <select id="select" name="select" class="custom-select" v-model="inputCategory">
                    <option>--Choose--</option>
                    <option v-for="(item, index) in categories" :key="index" :value="item.id">{{ item.name }}</option>
                </select>
            </div>
        </div>
        <div class="form-group" v-if="pageSettings['fields']['status']">
            <label class="label">Status</label> 
            <div>
                <select id="select" name="select" class="custom-select" v-model="inputStatus">
                    <option>--Choose--</option>
                    <option value="enable">Enable</option>
                    <option value="disable">Disable</option>
                </select>
            </div>
        </div>
        <div class="form-group" v-if="pageSettings['fields']['image']">
            <label class="label">Image</label> 
            <div>
                <input class="form-file" type="file" @change="handleImageChange" />
            </div>

            <div class="form-group">
                <div>Preview:</div>
                <img :src="imagePreview" class="preview-image"/>
            </div>
        </div>
        <div class="form-button-wrapper mr-3" v-if="showSave">
            <div name="submit" type="submit" class="btn btn-primary float-right" @click="addRow()">Save</div>
        </div>
        <div class="form-button-wrapper mr-3" v-if="showUpdate">
            <div name="submit" type="submit" class="btn btn-primary float-right" @click="updateRow()">Update</div>
        </div>
        <div class="form-button-wrapper mr-3" v-if="showDelete">
            <div name="submit" type="submit" class="btn btn-danger float-right" @click="deleteRow()">Delete</div>
        </div>
        <div class="form-button-wrapper mr-3">
            <div name="submit" type="submit" class="btn btn-danger float-right" @click="cancelRow()">Cancel</div>
        </div>
    </form>

    <div class="table-responsive p-4 bg-white">
        <table class="table table-striped">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Status</td>
                    <td>Image</td>
                    <td>Created</td>
                </tr>`
            </thead>
            <tbody>
                <tr v-for="(i, key) in getRows" @click="editRow(i)">
                    <td>{{ i.id }}</td>
                    <td>{{ i.name }}</td>
                    <td>{{ i.status }}</td>
                    <td>{{ i.image }}</td>
                    <td>{{ i.created_at }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useDataStore } from '../../stores/dataStore';
import { supabase } from '../../lib/supabaseClient'
import Alert from '../../components/Alert.vue'

export default{
    components: {
        Alert
    },
    data(){
        return {
            parentCategories : '',
            categories : '',
            inputId: '',
            inputName : '',
            inputCategory: '',
            inputParentCategory: '',
            inputStatus : '',
            inputImage : '',
            imagePath : '',
            dataStore : useDataStore(),
            dataRows : [],
            showSave : true,
            showUpdate : false,
            showCancel : false,
            showDelete : false,
            imagePreview : '',
            alertMessage : 'sample message',
            pageSettings : {},
            settings : {
                "/category" : {
                    header : 'Categories',
                    table : 'categories',
                    storage : 'Food Ordering',
                    saveMessage : 'New Category Added',
                    updateMessage : 'Category Updated',
                    deleteMessage : 'Category Deleted',
                    fields: {
                        name : true,
                        price : true,
                        category : false,
                        parent_category : false,
                        status : true,
                        image : true
                    }
                },
                "/sub-category" : {
                    header : 'SubCategories',
                    table : 'subcategories',
                    storage : 'Food Ordering',
                    saveMessage : 'New Sub-Category Added',
                    updateMessage : 'Sub-Category Updated',
                    deleteMessage : 'Sub-Category Deleted',
                    fields: {
                        name : true,
                        price : true,
                        category : false,
                        parent_category : true,
                        status : true,
                        image : true
                    }
                },
                "/item" : {
                    header : 'Items',
                    table : 'items',
                    storage : 'Food Ordering',
                    saveMessage : 'New Item Added',
                    updateMessage : 'Item Updated',
                    deleteMessage : 'Item Deleted',
                    fields: {
                        name : true,
                        price : true,
                        category : true,
                        parent_category : false,
                        status : true,
                        image : true
                    }
                }
            },
            pageHeader : '',
            pageTable : '',
            pageStorage : '',
            saveMessage : '',
            updateMessage : '',
            deleteMessage : '',
        }
    },

    created(){  
        const url = new URL(window.location.href)
        this.pathName = url.pathname
        this.pageSettings = this.settings[url.pathname]

        this.pageHeader = this.pageSettings['header']
        this.pageTable = this.pageSettings['table']
        this.pageStorage = this.pageSettings['storage']

        this.saveMessage = this.pageSettings['saveMessage']
        this.updateMessage = this.pageSettings['updateMessage']
        this.deleteMessage = this.pageSettings['deleteMessage']

        console.log(this.pageSettings)
    },

    mounted(){
        this.fetchRows()
        this.fetchParentCategories()
        this.fetchCategories()

        this.inputName = 'Shoes 2'
        this.inputStatus = 'disable'
    },

    computed: {
        getRows(){
            return this.dataRows
        },

        getImageLink(path){
            console.log(path)
            return false
        }
    },

    methods: {
        popAlert(msg){
            this.alertMessage = msg
            this.$refs.alertRef.showHide()
        },

        cancelRow(){
            this.inputId = ''
            this.inputName = ''
            this.inputPrice = ''
            this.inputStatus = 'enable'
            this.inputImage = ''
            this.submitText = 'Submit'
            this.showCancel = false
            this.showDelete = false
            this.showUpdate = false
            this.showSave = true
            this.imagePreview = ''
        },

        editRow(data){
            console.log(data)
            this.inputId = data.id
            
            if(this.pageSettings['fields']['name'] == true) this.inputName = data.name
            if(this.pageSettings['fields']['price'] == true) this.inputPrice = data.price
            if(this.pageSettings['fields']['status'] == true) this.inputStatus = data.status
            if(this.pageSettings['fields']['parent_category'] == true) this.inputParentCategory = data.parent_category
            if(this.pageSettings['fields']['category'] == true) this.inputCategory = data.category
            
            this.showSave = false,
            this.showUpdate = true
            this.showCancel = true
            this.showDelete = true

            if(this.pageSettings['fields']['image'] == true){
                this.imagePath = data.image
                const { data:imageurl } = supabase
                .storage
                .from(this.pageStorage)
                .getPublicUrl(this.imagePath)

                this.imagePreview = imageurl.publicUrl
            }
        },

        async addRow(){
            if(this.inputId.trim()){
                console.log("update")
            }else{
                try{
                    const uploadError = null
                    const dataToInsert = {}

                    if(this.pageSettings['fields']['image'] == true){
                        const { data: uploadImage, error: uploadError } = await supabase.storage
                        .from(this.pageStorage)
                        .upload('images/' +  Date.now(), this.inputImage)

                        if(this.pageSettings['fields']['name'] == true) dataToInsert.name = this.inputName
                        if(this.pageSettings['fields']['price'] == true) dataToInsert.price = this.inputPrice
                        if(this.pageSettings['fields']['parent_category'] == true) dataToInsert.parent_category = this.inputParentCategory
                        if(this.pageSettings['fields']['category'] == true) dataToInsert.category = this.inputCategory
                        if(this.pageSettings['fields']['status'] == true) dataToInsert.status = this.inputStatus
                        if(this.pageSettings['fields']['image'] == true) dataToInsert.image = uploadImage.path
                        if(this.pageSettings['fields']['image'] == true) dataToInsert.user_id = this.dataStore.userId
                    }else{
                        if(this.pageSettings['fields']['name'] == true) dataToInsert.name = this.inputName
                        if(this.pageSettings['fields']['price'] == true) dataToInsert.price = this.inputPrice
                        if(this.pageSettings['fields']['parent_category'] == true) dataToInsert.parent_category = this.inputParentCategory
                        if(this.pageSettings['fields']['category'] == true) dataToInsert.category = this.inputCategory
                        if(this.pageSettings['fields']['status'] == true) dataToInsert.status = this.inputStatus
                        if(this.pageSettings['fields']['image'] == true) dataToInsert.user_id = this.dataStore.userId
                    }

                    if(uploadError){
                        console.log(uploadError)
                    }else{
                        console.log(dataToInsert)

                        const { data, error } = await supabase
                        .from(this.pageTable)
                        .insert(dataToInsert)

                        this.fetchRows()
                        
                        this.popAlert(this.saveMessage)
                    }


                }catch(error){
                    console.error(error)
                }
            }
        },
        async updateRow(){
            console.log('input id: ' + this.inputId)
            try{
                const uploadError = null
                const dataToInsert = {}

                if(this.pageSettings['fields']['image'] == true){
                    if(this.inputImage){
                        const { data: uploadImage, error: uploadError } = await supabase.storage
                        .from(this.pageStorage)
                        .upload('images/' +  Date.now(), this.inputImage)

                        if(this.pageSettings['fields']['image'] == true) dataToInsert.image = uploadImage.path
                    }

                    if(this.pageSettings['fields']['name'] == true) dataToInsert.name = this.inputName
                    if(this.pageSettings['fields']['price'] == true) dataToInsert.price = this.inputPrice
                    if(this.pageSettings['fields']['parent_category'] == true) dataToInsert.parent_category = this.inputParentCategory
                    if(this.pageSettings['fields']['category'] == true) dataToInsert.category = this.inputCategory
                    if(this.pageSettings['fields']['status'] == true) dataToInsert.status = this.inputStatus
                    if(this.pageSettings['fields']['image'] == true) dataToInsert.user_id = this.dataStore.userId
                }else{
                    if(this.pageSettings['fields']['name'] == true) dataToInsert.name = this.inputName
                    if(this.pageSettings['fields']['price'] == true) dataToInsert.price = this.inputPrice
                    if(this.pageSettings['fields']['parent_category'] == true) dataToInsert.parent_category = this.inputParentCategory
                    if(this.pageSettings['fields']['category'] == true) dataToInsert.category = this.inputCategory
                    if(this.pageSettings['fields']['status'] == true) dataToInsert.status = this.inputStatus
                    if(this.pageSettings['fields']['image'] == true) dataToInsert.user_id = this.dataStore.userId
                }

                if(uploadError){
                    console.log(uploadError)
                }else{
                    console.log(dataToInsert)

                    const { data, error } = await supabase
                    .from(this.pageTable)
                    .update(dataToInsert)
                    .eq('id', this.inputId)

                    this.fetchRows()
                    
                    this.popAlert(this.updateMessage)
                }


            }catch(error){
                console.error(error)
            }
        },

        async fetchRows(){
            try {
                const { user } = supabase.auth

                const { data, error } = await supabase
                .from(this.pageTable)
                .select('*')
                .order('id', { ascending: false })

                this.dataRows = data

                console.log(data)
                console.log(error)

                if (error) {
                    console.error('Error fetching categories:', error.message);
                } else {
                    console.log('Categories:', data);
                }
            } catch (error) {
                console.error('An error occurred while fetching categories:', error);
            }
        },

        async fetchParentCategories(){
            try {
                const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name', { ascending: true })

                this.parentCategories = data

                console.log(this.parentCategories)

                if (error) {
                    console.error('Error fetching categories:', error.message);
                } else {
                    console.log('Categories:', data);
                }
            } catch (error) {
                console.error('An error occurred while fetching categories:', error);
            }
        },
        
        async fetchCategories(){
            try {
                const { data, error } = await supabase
                .from('subcategories')
                .select('*')
                .order('name', { ascending: true })

                this.categories = data

                console.log(this.categories)

                if (error) {
                    console.error('Error fetching subcategories:', error.message);
                } else {
                    console.log('Categories:', data);
                }
            } catch (error) {
                console.error('An error occurred while fetching subcategories:', error);
            }
        },

        async handleImageChange(event){
            this.inputImage = event.target.files[0]
        },
    },
}
</script>

<style scoped>
@import '../../assets/admin.css';

</style>