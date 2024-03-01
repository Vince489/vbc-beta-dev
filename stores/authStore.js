import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // Initialize the state with the retrieved data
    user: {},
  }),

  actions: {
    // Set the User data from the server
    async setUser(data) {
      this.user = data.user
    },


    // Login user
    async login(username, password) {
      try {
        const response = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ userName: username, password }),
        });
    
        if (!response.ok) {
          throw new Error('Login failed');
        }
    
        const  data  = await response.json();
        console.log('It works!! data:', data);

        // Call setUser action to update user data
        this.setUser(data);        

        return true;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async logout() {
      // Remove authState from session in MongoDB database
      fetch('https://auth-production-9197.up.railway.app/api/v1/user/logout', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      // Clear user data
      this.user = {};

      // clear jwt from cookies without expiring it 
      document.cookie = "jwt=; expires  Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // delete jwt from cookies
      
  

      // Redirect to login page
      this.$router.push('/login');
    },    
  },

  getters: {
    async getUser() {
      try {
        const response = await fetch('https://auth-production-9197.up.railway.app/api/v1/user/getUser', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
    
        // Parse response JSON
        const data = await response.json();
        console.log('GetUser:', data);
        // Call setUser action to update user data
        this.setUser(data);
      } catch (error) {
        // console.error('Error fetching user:', error.message);
        throw error;
      }
    },      
  },
});
