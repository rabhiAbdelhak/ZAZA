import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { generateBarCode } from './helper'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { dinarFormat } from '../../../../utils/formats'

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
  section: { flex: 1, paddingVertical: 68, paddingRight: 32 },
  leftSection: { flex: 1, paddingRight: 0 },
  rightSection: { flex: 1, paddingLeft: 0 },
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
  textLine: { lineHeight: 1.5 },
  attemptSection: {
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 100,
    textAlign: 'center',
  },
  attemptTitle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  attemptFooter: {
    display: 'flex',
    flexDirection: 'row',
    lineHeight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderTopWidth: 1,
  },
  attemptText: { fontSize: 12, textTransform: 'uppercase' },
  attemptFooterNumber: {
    flex: 1,
    paddingTop: 10,
    paddingbottom: 2,
  },
  attemptFooterNumberBordred: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  wilayaSection: {
    textAlign: 'center',
    fontSize: 56,
    fontWeight: 'bold',
    display: 'flex',
    lineHeight: 0,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  highlightSection: {
    backgroundColor: '#4caf50',
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 0,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderRadius: 8,
    height: 55,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightNoticeSection: {
    backgroundColor: '#f44336',
    fontSize: 12,
    paddingBottom: 10,
    paddingTop: 16,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  label: { fontSize: 12, marginTop: 12 },
  text: { fontSize: 14, fontWeight: 500 },
})

function PDFPackageA4({ data, user }) {
  return (
    <Page wrap style={styles.page} orientation="landscape" size="A4">
      <View style={styles.band}>
        <Text style={styles.bandText} wrap={false} break={false}>
          {data?.delivery_type?.toLowerCase()}
        </Text>
      </View>

      <View style={[styles.section]}>
        <Text style={[styles.label, { marginTop: 0 }]}>Bordereau n°</Text>
        <Text style={styles.text}>{data?.id}</Text>

        <Text style={styles.label}>Store</Text>
        <Text style={styles.text}>{user?.store?.name}</Text>

        <Text style={styles.label}>Store Tél</Text>
        <Text style={styles.text}>{user?.store?.phones}</Text>

        <View style={styles.attemptSection}>
          <View style={styles.attemptTitle}>
            <Text style={{ fontSize: 12 }}>Colis crée</Text>
            <Text style={styles.text}>
              {data?.created_at
                ? format(new Date(data?.created_at), 'dd MMM yyyy', {
                    locale: fr,
                  })
                : ''}
            </Text>
          </View>
          <View>
            <Text style={styles.attemptText}>Tentative</Text>
            <View style={styles.attemptFooter}>
              <View style={styles.attemptFooterNumber}>
                <Text style={styles.text}>1</Text>
              </View>
              <View
                style={[
                  styles.attemptFooterNumber,
                  styles.attemptFooterNumberBordred,
                ]}
              >
                <Text style={styles.text}>2</Text>
              </View>
              <View style={styles.attemptFooterNumber}>
                <Text style={styles.text}>3</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section]}>
        <Text style={styles.wilayaSection}>{data?.commune?.wilaya?.id}</Text>

        <Text style={[styles.label, { marginTop: 0 }]}>Client</Text>
        <Text style={styles.text}>{`${
          (data?.client_first_name, data?.client_last_name)
        }`}</Text>

        <Text style={styles.label}>Tél</Text>
        <Text style={styles.text}>{`${data?.client_phone}`}</Text>
        <Text style={styles.text}>{`${data?.client_phone2 || ''}`}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.text} break>
          {data?.address}
        </Text>

        <Text style={styles.label}>Commune</Text>
        <Text
          style={styles.text}
        >{`${data?.commune?.name}, ${data?.commune?.wilaya?.name}`}</Text>

        <Text style={[styles.label, { marginTop: 16, marginBottom: 4 }]}>
          Recouvrement
        </Text>
        <View style={styles.highlightSection}>
          <Text>{dinarFormat(data?.price_to_pay)}</Text>
        </View>
        {!data?.can_be_opened && (
          <View
            style={[styles.highlightSection, styles.highlightNoticeSection]}
          >
            <Text>Non Ouvrable</Text>
            <Text style={{ marginTop: 4 }}>غير قابل للفتح</Text>
          </View>
        )}
      </View>

      <View style={[styles.section]}>
        <Text style={{ fontSize: 12, marginTop: 0 }}>Type</Text>
        <Text style={[styles.text, { fontSize: 28 }]}>
          {data?.package_type}
        </Text>

        <Image
          style={{
            objectFit: 'contain',
            objectPosition: 'left top',
            height: 78,
            marginBottom: 4,
            marginLeft: -6,
          }}
          src={generateBarCode(data?.tracking_code, { width: 2, height: 90 })}
        />
        <Text style={styles.label}>Tracking</Text>
        <Text style={styles.text}>{data?.tracking_code}</Text>

        <Text style={[styles.label]}>Désignation</Text>
        <Text style={styles.text}>{data?.name}</Text>

        <Text style={[styles.label]}>Order</Text>
        <Text style={styles.text}>{data?.order_id}</Text>

        <Image
          style={{
            objectFit: 'contain',
            objectPosition: 'left top',
            height: 60,
            marginLeft: -6,
          }}
          src={generateBarCode(data?.order_id, { width: 3 })}
        />
      </View>
    </Page>
  )
}

export default PDFPackageA4
