import { Document, Font, Page, Text, View } from '@react-pdf/renderer'
import { useMemo } from 'react'
import PDFPackageA4 from './PDFPackageA4'
import PDFPackageA6 from './PDFPackageA6'

Font.register({
  family: 'Tajawal',
  fonts: [
    { src: '/fonts/Tajawal-Regular.ttf' },
    { src: '/fonts/Tajawal-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Tajawal-Bold.ttf', fontWeight: 700 },
  ],
})

function chunck(arr = [], chunckSize = 4) {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunckSize)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])
}

function PDFPackage({ isA6Format = false, data = [], user }) {
  const result = useMemo(() => chunck(data).map((el) => chunck(el, 2)), [data])

  if (isA6Format) {
    return (
      <Document language="fr">
        {result.map((page, index) => (
          <Page
            key={index}
            size="A4"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            {page.map((rows, rIndex) => (
              <View
                key={rIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {rows.map((column, cIndex) => (
                  <View
                    key={column.id}
                    style={{
                      width: '50vw',
                      height: '50vh',
                      borderRightWidth: cIndex % 2 === 0 ? 1 : 0,
                      borderBottomWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: '#ddd',
                    }}
                  >
                    <PDFPackageA6 user={user} data={column}>
                      {column.id}
                    </PDFPackageA6>
                  </View>
                ))}
              </View>
            ))}
          </Page>
        ))}
      </Document>
    )
  }

  return (
    <Document language="fr">
      {data.map((el) => (
        <PDFPackageA4 user={user} data={el} key={el.id} />
      ))}
    </Document>
  )
}

export default PDFPackage
