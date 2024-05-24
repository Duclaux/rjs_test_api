import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import AjouterPublication from './components/AjouterPublication'
import axios from 'axios'
import { QueryClient, useQuery } from 'react-query'
import { useQueryClient } from 'react-query'

function Dashboard() {
  // const [ publications, setPublications ] = useState([])

  const navigator = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem("utilisateur")){
      navigator("/connexion")
    }

    // axios.get("http://localhost:3000/publications").then((res) => {
    //   setPublications(res.data)
    // })
  })

  const queryClient = useQueryClient()

  const { data:publications, error, isLoading } = useQuery({
    queryKey: ['publications'],
    queryFn : () => axios.get("http://localhost:3000/publications").then((res) => res.data),
    onerror: (error) => console.log(error)
  })

  if(isLoading){
    return<div>Chargement...</div>
  }

  let pubTrier = publications.sort((a, b) => {
    return new Date(b.datePublication) - new Date(a.datePublication)
  })

  return (
    <Box bgcolor={"#eef4ff"}>
      <Navbar/>
      <AjouterPublication/>

      <Box
        width={"60%"}
        margin={"auto"}
        marginTop={4}
      >
        {
          publications && pubTrier.map((publication) => (
            <Box
              width={"100%"}
              bgcolor={"#fff"}
              borderRadius={4}
              marginBottom={3}
              padding={2}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={2}
              >
                <Avatar src={publication.photoUtilisateur}/>
                <Typography>{publication.auteur}</Typography>
              </Stack>

              <Typography>{publication.textePublication}</Typography>

              <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
              <img src={publication.imagePublication}
                style={{
                  width: '100%',
                  borderRadius:4
                }}
              />
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default Dashboard