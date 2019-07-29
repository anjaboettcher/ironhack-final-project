import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function Countries() {
  const [something, setSomething] = useState([])
  useEffect(() => {
    api
      .getRecipe()
      .then(something => {
        setSomething(something)
      })
      .catch(err => console.log(err))
  }, [])

  return <div>Nothin here yet either...</div>
}
