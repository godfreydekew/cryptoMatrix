// src/components/Users.jsx
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { fetchUsers } from '../../api/api' // Import the API functions
import axios from 'axios'

const Users = () => {
  const queryClient = useQueryClient()

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading users</div>

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Users
