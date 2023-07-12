import { fontSize } from '@mui/system'
import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { dinarFormat } from '../../../../utils/formats'
import { generateBarCode, generateQRCode } from './helper'

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Tajawal',
    fontSize: 11,
    lineHeight: 1.1,
    color: 'rgba(0,0,0, 0.85)',
    padding: 8,
  },
  band: {
    backgroundColor: '#000',
    color: '#fff',
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 10,
    fontWeight: 500,
    alignSelf: 'flex-start',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  storeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeInfo: { flex: 2, marginRight: 16, paddingTop: 4 },
  section: { marginTop: 16 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 4 },
  sectionTitle2: { fontWeight: 'bold' },
  wilayaContainer: { alignSelf: 'flex-end', textAlign: 'right', flex: 1 },
  wilaya: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'right',
    lineHeight: 0.7,
    marginBottom: 4,
  },
  label: { fontSize: 9, color: 'rgba(0,0,0,0.65)', marginTop: 8 },
  trackingImg: {
    objectFit: 'contain',
    height: 50,
    objectPosition: 'right top',
  },
  orderImg: {
    objectFit: 'contain',
    height: 40,
    objectPosition: 'right top',
    marginTop: 8,
  },
  price: { fontWeight: 'bold', fontSize: 28, marginTop: 4, lineHeight: 0.7 },
  signatureSection: {
    marginTop: 20,
    textAlign: 'justify',
    display: 'flex',
    flexDirection: 'row',
  },
})

const PDFPackageA6 = ({ data, user }) => {
  return (
    <View wrap style={styles.page}>
      <View style={styles.storeContainer}>
        <View style={styles.storeInfo}>
          <Text>{user?.store?.name}</Text>
          <Text>{user?.store?.phones}</Text>
        </View>
        <Text style={styles.band}>expecess economy</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Détails client</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text style={{ textTransform: 'capitalize' }}>{`${
              (data?.client_first_name, data?.client_last_name)
            }`}</Text>
            <Text>{`${data?.client_phone} ${
              data?.client_phone2 ? ' / ' + data?.client_phone2 : ''
            }`}</Text>
            <Text>{data?.address}</Text>
          </View>

          <View style={styles.wilayaContainer}>
            <Text style={styles.wilaya}>{data?.commune?.wilaya?.id}</Text>
            <Text>{`${data?.commune?.name}, ${data?.commune?.wilaya?.name}`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 1.5, marginRight: 16 }}>
            <Text style={styles.sectionTitle2}>Détails colis</Text>
            <Text style={styles.label}>Type</Text>
            <Text>{data?.package_type}</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 32 }}>
                <Text style={styles.label}>Tracking</Text>
                <Text>{data?.tracking_code}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Order</Text>
                <Text>{data?.order_id}</Text>
              </View>
            </View>
            <Text style={styles.label}>Designation</Text>
            <Text>{data?.name}</Text>
          </View>

          <View style={{ textAlign: 'right', flex: 1 }}>
            <Image
              style={styles.trackingImg}
              src={generateBarCode(data?.tracking_code, {
                displayValue: true,
                width: 2,
              })}
            />

            <Image
              style={styles.orderImg}
              src={generateBarCode(data?.order_id, {
                displayValue: true,
                width: 3,
              })}
            />
          </View>
        </View>
      </View>

      <View style={[styles.section, { textAlign: 'center' }]}>
        <Text>Recouvrement</Text>
        <Text style={styles.price}>{dinarFormat(data?.price_to_pay)}</Text>
      </View>

      <View style={styles.signatureSection}>
        <Text style={{ flex: 2, marginRight: 16 }}>
          Je, {user?.store?.name}, certifie que les détails déclarés sur ce
          bordereau sont corrects et que le colis ne contient aucun produit
          dangereux, interdit par la loi ou par les conditions générales de
          transport Zimou express.
        </Text>
        <View style={{ flex: 1 }}>
          <Text>
            Le,{' '}
            {data?.created_at
              ? format(new Date(data.created_at), 'dd MMM yyyy')
              : ''}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>Signature</Text>
        </View>
      </View>
    </View>
  )
}

export default PDFPackageA6
