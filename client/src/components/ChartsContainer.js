import React, { useState } from 'react'

import CardView from './CardView'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  const [cardView, setCardView] = useState(false)
  const { monthlyProjects: data } = useAppContext()
  return (
    <Wrapper>
      <h4>Monthly Projects Group By Deadline</h4>
      <button type='button' onClick={() => setCardView(!cardView)}>
        {cardView ?  'Card View': 'Area Chart' }
      </button>
      {cardView? <CardView data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer