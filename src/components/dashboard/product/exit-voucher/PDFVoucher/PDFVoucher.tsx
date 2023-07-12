import {
  Document,
  Font,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
const styles = StyleSheet.create({
  page: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Tajawal',
    fontSize: 14,
    lineHeight: 1.5,
    color: 'rgba(0,0,0, 0.85)',
  },
  band: {
    backgroundColor: '#158be5',
    position: 'relative',
    width: 48,
    color: '#fff',
    marginRight: 32,
  },
  bandText: {
    position: 'absolute',
    width: '100vw',
    transform: 'rotate(-90deg)',
    left: '-46vw',
    textAlign: 'right',
    paddingRight: '56vw',
    fontSize: 24,
    textTransform: 'uppercase',
  },
  section: { marginLeft: 25, flex: 1, paddingVertical: 34, paddingRight: 32 },
  sectionupperPart: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    padding: 10,
  },
  gridItem: {
    display: 'flex',
    width: '50%',
    padding: 5,
  },
  label: { fontSize: 12, marginTop: 12 },
  text: { fontSize: 14, fontWeight: 500 },
  headingArray: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowArray: {
    flexDirection: 'row',
    borderBottom: '1 solid #ccc',
    alignItems: 'center',
    height: 30,
    paddingLeft: 10,
    marginTop: 5,
  },
  rowArrayBig: {
    flexDirection: 'row',
    borderBottom: '1 solid #ccc',
    alignItems: 'center',
    height: 30,
    paddingLeft: 10,
    marginTop: 5,
  },
  rowFinalArray: {
    display: 'flex',

    bordertop: '1 solid #ccc',
    alignItems: 'flex-end',
    height: 30,
    paddingLeft: 10,
    marginTop: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  headerCellBig: {
    flex: 3,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
  },
  cellBig: {
    flex: 3,
  },
  sectionArray: { marginTop: 20, marginLeft: 20, flex: 1 },
})
Font.register({
  family: 'Tajawal',
  fonts: [
    { src: '/fonts/Tajawal-Regular.ttf' },
    { src: '/fonts/Tajawal-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Tajawal-Bold.ttf', fontWeight: 700 },
  ],
})

function PDFVoucher({ dataprint, typeOfDocument }: any) {
  console.log(dataprint, typeOfDocument)
  const totalPriceOfProducts = dataprint?.products.reduce(
    (prev: any, next: any) => {
      return prev + next.quantity * next.unit_price
    },
    0,
  )
  //   const result = useMemo(() => chunck(data).map((el) => chunck(el, 2)), [data])

  if (typeOfDocument === 'Purchase') {
    return (
      <Document language="fr">
        <Page wrap style={styles.page} orientation="landscape" size="A4">
          <View style={styles.band}>
            <Text style={styles.bandText} wrap={false} break={false}>
              Zimou Express
            </Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionupperPart}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Supplier</Text>
                <Text style={styles.text}>
                  {dataprint?.supplier.name
                    ? dataprint?.supplier.name
                    : 'no reference'}
                </Text>{' '}
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.text}>
                  {dataprint?.date ? dataprint?.date : 'no reference'}
                </Text>
              </View>
              <View style={styles.gridItem}>
                {' '}
                <Text style={styles.label}>Ref</Text>
                <Text style={styles.text}>
                  {dataprint?.origin ? dataprint?.origin : 'no reference'}
                </Text>{' '}
              </View>
              <View style={styles.gridItem}>
                {' '}
                <Text style={styles.label}>Note</Text>
                <Text style={styles.text}>
                  {dataprint?.comment ? dataprint?.comment : 'no reference'}
                </Text>{' '}
              </View>
            </View>
            {/* test */}
            <View style={styles.sectionArray}>
              <Text style={styles.headingArray}>Products</Text>
              <View style={styles.rowArray}>
                <Text style={styles.headerCellBig}>Name</Text>
                <Text style={styles.headerCell}>Quantity</Text>
                <Text style={styles.headerCell}>Price</Text>
                <Text style={styles.headerCell}>Total</Text>
              </View>
              {dataprint?.products
                ? dataprint?.products.map((item: any) => (
                    <View key={item.id} style={styles.rowArray}>
                      <Text style={styles.cellBig}>{item.name}</Text>
                      <Text style={styles.cell}>{item.quantity}</Text>
                      <Text style={styles.cell}>{item.unit_price}</Text>
                      <Text style={styles.cell}>{item.total_price}</Text>
                    </View>
                  ))
                : 'no reference'}
              <View style={styles.rowFinalArray}>
                <Text>Prix Total : {totalPriceOfProducts}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    )
  }
  if (typeOfDocument === 'ExitVouchers') {
    return (
      <Document language="fr">
        <Page wrap style={styles.page} orientation="landscape" size="A4">
          <View style={styles.band}>
            <Text style={styles.bandText} wrap={false} break={false}>
              Zimou Express
            </Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionupperPart}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Warehouse</Text>
                <Text style={styles.text}>
                  {dataprint?.warehouse.name
                    ? dataprint?.warehouse.name
                    : 'no reference'}
                </Text>{' '}
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.text}>
                  {dataprint?.date ? dataprint?.date : 'no reference'}
                </Text>
              </View>
              <View style={styles.gridItem}>
                {' '}
                <Text style={styles.label}>Ref</Text>
                <Text style={styles.text}>
                  {dataprint?.ref ? dataprint?.ref : 'no reference'}
                </Text>{' '}
              </View>
              <View style={styles.gridItem}>
                {' '}
                <Text style={styles.label}>Note</Text>
                <Text style={styles.text}>
                  {dataprint?.note ? dataprint?.note : 'no reference'}
                </Text>{' '}
              </View>
            </View>
            {/* test */}
            <View style={styles.sectionArray}>
              <Text style={styles.headingArray}>Products</Text>
              <View style={styles.rowArray}>
                <Text style={styles.headerCell}>Name</Text>
                <Text style={styles.headerCell}>Quantity</Text>
              </View>
              {dataprint?.products
                ? dataprint?.products.map((item: any) => (
                    <View key={item.id} style={styles.rowArray}>
                      <Text style={styles.cell}>{item.name}</Text>
                      <Text style={styles.cell}>{item.quantity}</Text>
                    </View>
                  ))
                : 'no reference'}
            </View>
          </View>
        </Page>
      </Document>
    )
  }

  if (typeOfDocument === 'EntryVouchers') {
    return (
      <Document language="fr">
        <Page wrap style={styles.page} orientation="landscape" size="A4">
          <View style={styles.band}>
            <Text style={styles.bandText} wrap={false} break={false}>
              Zimou Express
            </Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionupperPart}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Warehouse</Text>
                <Text style={styles.text}>
                  {dataprint?.warehouse.name
                    ? dataprint?.warehouse.name
                    : 'no reference'}
                </Text>{' '}
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.text}>
                  {dataprint?.date ? dataprint?.date : 'no reference'}
                </Text>
              </View>
              <View style={styles.gridItem}>
                {' '}
                <Text style={styles.label}>Ref</Text>
                <Text style={styles.text}>
                  {dataprint?.ref ? dataprint?.ref : 'no reference'}
                </Text>{' '}
              </View>
              <View style={styles.gridItem}>
                {' '}
                <Text style={styles.label}>Note</Text>
                <Text style={styles.text}>
                  {dataprint?.note ? dataprint?.note : 'no reference'}
                </Text>{' '}
              </View>
            </View>
            {/* test */}
            <View style={styles.sectionArray}>
              <Text style={styles.headingArray}>Products</Text>
              <View style={styles.rowArray}>
                <Text style={styles.headerCell}>Name</Text>
                <Text style={styles.headerCell}>Quantity</Text>
              </View>
              {dataprint?.products
                ? dataprint?.products.map((item: any) => (
                    <View key={item.id} style={styles.rowArray}>
                      <Text style={styles.cell}>{item.name}</Text>
                      <Text style={styles.cell}>{item.quantity}</Text>
                    </View>
                  ))
                : 'no reference'}
            </View>
          </View>
        </Page>
      </Document>
    )
  }
  return (
    <Document language="fr">
      {' '}
      <Page>
        <View style={styles.band}> Empty</View>
      </Page>
    </Document>
  )
}

export default PDFVoucher
