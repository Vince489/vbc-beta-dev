<template>
  <div class="flex justify-center items-center mt-32">
    <div class="w-full max-w-sm">
      <div>
        <h1 class="pb-6 text-4xl">Signup</h1>
      </div>
      <form @submit.prevent="handleSubmit" class="bg-gray-400  shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="userName">
            Username
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userName" type="text" placeholder="Username" v-model="userName">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="password">
          <p class="hidden text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex justify-center">
          <button class="btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/register', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include', // Include cookies in the request
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName: this.userName,
            password: this.password
          })
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }

        console.log('Form submitted successfully')

        // Clear the inputs
        this.userName = ''
        this.password = ''

        // Redirect to verify page
        this.$router.push('/login')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>

</style>

<script>




</script>
