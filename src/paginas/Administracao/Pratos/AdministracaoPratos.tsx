import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Button } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"
import { Link as RouterLink } from 'react-router-dom'


const AdministracaoPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('/pratos/')
      .then(resposta => setPratos(resposta.data))
  }, [])

  const excluir = (pratoASerExcluido: IPrato) => {
    http.delete(`/pratos/${pratoASerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoASerExcluido.id)
        setPratos([...listaPratos])

      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>

            <TableCell>
              Nome
            </TableCell>
            
            
            <TableCell>
              Tag
            </TableCell>

            <TableCell>
              Imagem
            </TableCell>

            <TableCell>
              Editar
            </TableCell>

            <TableCell>
              Excluir
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map(prato => <TableRow key={prato.id}>
            <TableCell>
              {prato.nome}
            </TableCell>
            <TableCell>
              {prato.tag}
            </TableCell>
            <TableCell>
              <a href={prato.imagem} target="blank" rel="noreferrer">Ver Imagem</a>
            </TableCell>
            <TableCell>
              [ <RouterLink to={`/admin/pratos/${prato.id}`}>editar</RouterLink> ]
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoPratos