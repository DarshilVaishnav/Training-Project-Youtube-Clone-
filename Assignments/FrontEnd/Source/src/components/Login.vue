<template lang="">
  <form>
    <div class="login">
        <!-- Pills navs -->
        <ul class="nav nav-pills nav-justified mb-5" id="ex1" role="tablist">
          <li class="nav-item me-3" role="presentation">
            <a class="btn btn-danger w-100 active" id="tab-login" @click="loginUser()" data-bs-toggle="pill" href="#pills-login" role="tab"
              aria-controls="pills-login" aria-selected="true">Login</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="btn btn-danger w-100" id="tab-register" @click="registerUser()" data-bs-toggle="pill" href="#pills-register" role="tab"
              aria-controls="pills-register" aria-selected="false">Register</a>
          </li>
        </ul>
        <!-- Pills navs -->

        <!-- Pills content -->
        <div class="tab-content">
          <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form>
              <!-- <div class="text-center mb-3">
                <p>Sign in with:</p>
                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-google"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-github"></i>
                </button>
              </div>

              <p class="text-center">or:</p> -->

              <!-- Email input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="email">Email</label>
                <input type="email" @input="setLoginEmail" v-model="login.email" id="email" class="form-control" placeholder="Email"/>
                <span v-if="v$.login.email.$error"> {{ v$.login.email.$errors[0].$message }} </span>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="loginPassword">Password</label>
                <input type="password" @input="setLoginPassword" v-model="login.password" id="loginPassword" class="form-control" placeholder="Password" maxlength="6"/>
                <span v-if="v$.login.password.$error"> {{ v$.login.password.$errors[0].$message }} </span>
              </div>

              <!-- 2 column grid layout -->
              <div class="row mb-4">
                <div class="col-md-6 d-flex justify-content-center">
                  <!-- Checkbox -->
                  <!-- <div class="form-check mb-3 mb-md-0">
                    <input class="form-check-input" type="checkbox" value="" id="loginCheck" />
                    <label class="form-check-label" for="loginCheck"> Remember me </label>
                  </div> -->
                </div>

                <!-- <div class="col-md-6 d-flex justify-content-center"> 
                  Simple link
                  <a href="#!">Forgot password?</a>
                </div> -->
              </div>

              <!-- Submit button -->
              <button type="button" @click="submitLogin()" class="btn btn-danger w-100 mb-4" id="signin">Sign in</button>
              <!-- <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                   <div class="toast-header">
                      <img src="" class="rounded me-2" alt="...">
                      <strong class="me-auto">Bootstrap</strong>
                      <small>11 mins ago</small>
                      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                      Hello, world! This is a toast message.
                    </div>
                </div>
              </div> -->
              <!-- Register buttons -->
              <!-- <div class="text-center">
                <p>Not a member? <a data-bs-toggle="pill" @click="registerUser()" href="#pills-register" aria-selected="false">Register</a></p>
              </div> -->
            </form>
          </div>
          <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form>
              <!-- <div class="text-center mb-3">
                <p>Sign up with:</p>
                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-google"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-github"></i>
                </button>
              </div>

              <p class="text-center">or:</p> -->

              <!-- FirstName input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="firstname">FirstName</label>
                <input type="text" @input="setFirstname" v-model="register.firstname" id="firstname" class="form-control" placeholder="First Name" required/>
                <span v-if="v$.register.firstname.$error"> {{ v$.register.firstname.$errors[0].$message }} </span>
              </div>

              <!-- LastName input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="lastname">LastName</label>
                <input type="text" @input="setLastname" v-model="register.lastname" id="lastname" class="form-control" placeholder="Last Name" required/>
                <span v-if="v$.register.lastname.$error"> {{ v$.register.lastname.$errors[0].$message }} </span>
              </div>

              <!-- Email input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="registerEmail">Email</label>
                <input type="email" @input="setEmail" v-model="register.email" id="registerEmail" class="form-control" placeholder="Email" required/>
                <span v-if="v$.register.email.$error"> {{ v$.register.email.$errors[0].$message }} </span>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="registerPassword">Password</label>
                <input type="password" @input="setPassword" v-model="register.password" id="registerPassword" class="form-control" placeholder="Password" maxlength="6" required/>
                <span v-if="v$.register.password.$error"> {{ v$.register.password.$errors[0].$message }} </span>
              </div>

              <label class="form-label" for="gender">Gender</label>
              <div class="form-check mb-3">
                <input class="form-check-input" v-model="register.gender" value="M" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                  Male
                </label>
              </div>

              <div class="form-check mb-4">
                <input class="form-check-input" v-model="register.gender" value="F" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                <label class="form-check-label" for="flexRadioDefault2">
                  Female
                </label>
              </div>

              <!-- Country input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="country">Country</label>
                <!-- <input type="text" @input="setCountry" v-model="register.country" id="country" class="form-control" required/> -->
                <select @input="setCountry" v-model="register.country" id="country" class="form-select" required>
                  <option value="" label="Select a country ..." selected></option>
                  <option value="AUS" label="Australia">Australia</option>
                  <option value="SOA" label="South Africa">South Africa</option>
                  <option value="ENG" label="England">England</option>
                  <option value="IND" label="India">India</option>
                </select>
                <span v-if="v$.register.country.$error"> {{ v$.register.country.$errors[0].$message }} </span>  
              </div>

              <!-- Checkbox -->
              <!-- <div class="form-check d-flex justify-content-center mb-4">
                <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                  aria-describedby="registerCheckHelpText" />
                <label class="form-check-label" for="registerCheck">
                  I have read and agree to the terms
                </label>
              </div> -->

              <!-- Submit button -->
              <button type="button" @click="submitRegister()" class="btn btn-danger w-100 mb-3">Register</button>
            </form>
          </div>
        </div>
        <!-- Pills content -->
    </div>
  </form>
</template>
<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

export default {
    name:'LoginComponent',
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
      return {
        register:{
          firstname:'',
          lastname:'',
          email:'',
          password:'',
          gender:'M',
          country:''
        },
        login:{
          email:'',
          password:''
        },
        token:'',
        userid:0
      }
    },
    validations(){
      return{
        register:{
          firstname:{ required },
          lastname:{ required },
          email:{ required, email },
          password:{ required, minLength: helpers.withMessage('This field must be 6 characters long', minLength(6)) },
          gender:{ required },
          country:{ required },
        },
        login:{
          email:{ required, email },
          password:{ required }
        }
      }
    },
    methods: {
      setFirstname(){
        this.v$.register.firstname.$touch();
      },
      setLastname(){
        this.v$.register.lastname.$touch();
      },
      setEmail(){
        this.v$.register.email.$touch();
      },
      setPassword(){
        this.v$.register.password.$touch();
      },
      setGender(){
        this.v$.register.gender.$touch();
      },
      setCountry(){
        this.v$.register.country.$touch();
      },
      setLoginEmail(){
        this.v$.login.email.$touch();
      },
      setLoginPassword(){
        this.v$.login.password.$touch();
      },
      registerUser(){
        this.$router.push('/register')
      },
      loginUser(){
        this.$router.push('/login')
      },
      async submitRegister(){
        try {
          if (!this.v$.register.$invalid){
          let res = await axios.post(`${process.env.VUE_APP_URL}/register`,this.register);  
          console.log('res',res);
          if(res){
            this.$moshaToast({ title: 'Registration Successfully'},{type: 'success',timeout:2000})
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
          }
          else{
            this.$moshaToast({ title: "Please Enter the required field"},{type: 'danger',timeout:2000})
            this.v$.register.$touch()
          }
        } catch (error) {
          this.$moshaToast({ title: "User with the given email - already exist"},{type: 'warning',timeout:2000})
          this.v$.register.$touch()
        }
      },

      async submitLogin(){
        try {
          if (!this.v$.login.$invalid) {
            let res = await axios.post(`${process.env.VUE_APP_URL}/login`,this.login);
            // console.log('login',res.data.user.firstname);
            let token = res.data.token;
            let user = {userid:res.data.user.userid, firstname:res.data.user.firstname, lastname:res.data.user.lastname}
            localStorage.setItem("user",token);
            this.$cookies.set('user',user)
            this.token = token;
            if(res){
              this.$moshaToast({ title: 'Login Successfully'},{type: 'success',timeout:2000})
              setTimeout(() => {
                this.$router.push("/")
              }, 2000);
            }
            this.getUser()
          }
          else{
            this.$moshaToast({ title: "Please Enter the required field"},{type: 'danger',timeout:2000})
            this.v$.login.$touch()
          }          
        } catch (error) {
          this.$moshaToast({ title: "Incorrect email or password"},{type: 'danger',timeout:2000})
          this.v$.login.$touch()
        }
      },
      async getUser(){
        let res = await axios.post(`${process.env.VUE_APP_URL}/get-user`,this.login,
        {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }
        });
        this.userid = res.data.data.userid;
        // console.log('userid',this.userid);
      }
    },
}
</script>

<style scoped>
.login{
    margin: auto;
    width:30%;
    margin-top: 150px;
}

span {
  font-size: 14px;
  color: red;
}
</style>