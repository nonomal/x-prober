import BootstrapStore from '@/Bootstrap/src/stores'
import { GUTTER } from '@/Config/src'
import { gettext } from '@/Language/src'
import { device } from '@/Style/src/components/devices'
import formatBytes from '@/Utils/src/components/format-bytes'
import template from '@/Utils/src/components/template'
import { observer } from 'mobx-react-lite'
import React from 'react'
import styled from 'styled-components'
import store from '../stores'
const StyledFooter = styled.div`
  background: ${({ theme }) => theme.colorDark};
  color: ${({ theme }) => theme.colorGray};
  width: 100%;
  border-radius: 10rem;
  text-align: center;
  padding: calc(${GUTTER} / 2) ${GUTTER};
  margin: calc(${GUTTER} * 1.5) auto;
  word-break: normal;
  text-shadow: ${({ theme }) => theme.textShadowWithDarkBg};
  @media ${device('tablet')} {
    width: 60%;
  }
  a {
    color: ${({ theme }) => theme.colorGray};
    :hover {
      color: ${({ theme }) => theme.colorGray};
    }
  }
`
const Footer = observer(() => {
  const { appName, appUrl, authorName, authorUrl } = BootstrapStore
  const { memUsage, time } = store.conf
  return (
    <StyledFooter
      dangerouslySetInnerHTML={{
        __html: template(
          gettext(
            'Generator {{appName}} / Author {{authorName}} / {{memUsage}} / {{time}}ms'
          ),
          {
            appName: `<a href="${appUrl}" target="_blank">${appName}</a>`,
            authorName: `<a href="${authorUrl}" target="_blank">${authorName}</a>`,
            memUsage: formatBytes(memUsage),
            time: (time * 1000).toFixed(2),
          }
        ),
      }}
    />
  )
})
export default Footer
