import { Box, Grid, Typography } from "@mui/material";
import { UserPortfolio } from "../types";
import Layout from "./Layout"
import Image from 'next/image';

interface Props {
  user: UserPortfolio;
}

const Title = ({ text }: { text: string }) => (
  <Typography variant='h5' my={1} >{text}</Typography>
);

const StudentPortfolio = ({ user }: Props) => {
  console.log(user);
  return (
    <Layout>
      <Typography variant='h4' mb={1}>{user.name} {user.lastName}</Typography>
      <Typography mb={2}>
        {user.career === 'IECI' ? 'Ingeniería de Ejecución en Computación e Informática' : "Ingeniería Civil Informática"}
      </Typography>
      <Box display={'flex'} justifyContent='center'>
        <Box position='relative' height='200px' width='200px' display={'flex'}>
          <Image src={user.image!} layout='fill' style={{ borderRadius: '50%' }} objectFit='cover' />
        </Box>
      </Box>
      <Title text='Sobre mí' />
      <Typography textAlign={"justify"} variant='body1'>{user.about}</Typography>
      <Title text='Tecnologías' />
      <Grid container spacing={2}>
        {user.technologies.map((tech) => (
          <Grid item xs={6}>
            <Box border={"2px solid black"} p={1} key={tech.technology.id} display="flex" alignItems={"center"} gap={1}>
              <i className={tech.technology.icon} style={{ fontSize: "40px" }} />
              <Typography variant='body1'>{tech.technology.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default StudentPortfolio;