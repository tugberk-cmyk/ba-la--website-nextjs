export default function IptalVeIadePage() {
  return (
    <main className="pt-[60px]">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Iptal ve Iade Politikasi
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Son guncelleme: 01.02.2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-foreground/80">
          {/* Genel Bilgi */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              1. Genel Bilgi
            </h2>
            <p>
              Baglac (baglac.com.tr), D-OPTION DANISMANLIK VE TEKNOLOJI
              HIZMETLERI ANONIM SIRKETI tarafindan sunulan bir SaaS (Software
              as a Service) platformudur. Platformumuz uzerinden satin alinan
              tum hizmetler dijital hizmet niteligindedir ve asagidaki iptal ve
              iade kosullarina tabidir.
            </p>
          </section>

          {/* Cayma Hakki */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              2. Cayma Hakki
            </h2>
            <p>
              6502 sayili Tuketicinin Korunmasi Hakkinda Kanun ve Mesafeli
              Sozlesmeler Yonetmeligi uyarinca, dijital icerik ve dijital
              hizmetlerin ifasina baslanan hallerde cayma hakki
              kullanilamaz.
            </p>
            <p className="mt-3">
              Baglac platformunda abonelik basladiktan ve hizmete erisim
              saglandiktan sonra, hizmetin dijital ortamda ifa edilmis olmasi
              sebebiyle cayma hakki kullanilamaz. Musteri, uyelik ve abonelik
              islemlerini tamamlayarak bu durumu kabul etmis sayilir.
            </p>
          </section>

          {/* Abonelik Iptali */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              3. Abonelik Iptali
            </h2>
            <p>
              Musteri, aboneligini asagidaki yontemlerle iptal edebilir:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                Panel uzerinden &quot;Abonelik Yonetimi&quot; bolumunden iptal
                talebinde bulunarak
              </li>
              <li>info@baglac.com.tr adresine yazili iptal bildirimi gondererek</li>
            </ul>
            <p className="mt-3">
              Iptal talebi, mevcut abonelik doneminin sonunda yururluge girer.
              Iptal tarihine kadar olan donem icin herhangi bir iade
              yapilmaz. Musteri, iptal talebinden sonra mevcut abonelik
              doneminin sonuna kadar hizmetten yararlanmaya devam eder.
            </p>
          </section>

          {/* Iade Kosullari */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              4. Iade Kosullari
            </h2>
            <p>
              Asagidaki durumlarda iade talep edilebilir:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <span className="font-medium text-foreground">
                  Teknik Erisim Sorunu:{" "}
                </span>
                Platformun SAGLAYICI kaynakli teknik bir sorun nedeniyle
                kesintisiz 7 gunuen fazla erisilemez olmasi durumunda, erisim
                saglanamayan donemin hizmet bedeli iade edilir.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Mukerrer Odeme:{" "}
                </span>
                Ayni donem icin birden fazla tahsilat yapilmasi halinde, fazla
                alinan tutar 10 is gunu icinde iade edilir.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Hizmetin Sunulamamasi:{" "}
                </span>
                SAGLAYICI&apos;nin sozlesmede taahhut ettigi hizmetleri
                saglamadigi ve bu durumun SAGLAYICI&apos;ya yazili olarak
                bildirilmesine ragmen 15 gun icinde giderilmedigi hallerde,
                kullanilmamis donemin hizmet bedeli iade edilir.
              </li>
            </ul>
          </section>

          {/* Iade Yapilmayacak Durumlar */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              5. Iade Yapilmayacak Durumlar
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                Musteri&apos;nin platformu kullanmamasi veya az kullanmasi
                nedeniyle yapilacak iptal talepleri
              </li>
              <li>
                Abonelik doneminin tamamlanmasindan sonra yapilan iade
                talepleri
              </li>
              <li>
                Musteri&apos;nin kendi ihmali veya hatasi nedeniyle olusam
                sorunlar (yanlis hesap bilgileri, sifre paylasimi vb.)
              </li>
              <li>
                Ucuncu taraf hizmet saglayicilarindan (odeme altyapisi, bulut
                barindirma vb.) kaynaklanan ve SAGLAYICI&apos;nin kontrolu
                disindaki kesintiler
              </li>
              <li>
                Mucbir sebep hallerinden kaynaklanan hizmet kesintileri
              </li>
            </ul>
          </section>

          {/* Iade Sureci */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              6. Iade Sureci
            </h2>
            <p>
              Iade talepleri info@baglac.com.tr adresine yazili olarak
              iletilmelidir. Talepler en gec 10 is gunu icinde
              degerlendirilir. Uygun bulunan iade talepleri, odemenin yapildigi
              yonteme gore (kredi karti veya havale/EFT) 10 is gunu icinde
              gerceklestirilir.
            </p>
            <p className="mt-3">
              Kredi kartina yapilan iadelerin hesaba yansima suresi, ilgili
              bankanin islem suresine bagli olup SAGLAYICI&apos;nin kontrolu
              disindadir.
            </p>
          </section>

          {/* Fesih Kosullari */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              7. Erken Fesih Kosullari
            </h2>
            <p>
              Musteri, yazili bildirimde bulunmak kaydiyla sozlesmeyi 60 gun
              oncesinden hicbir kosul gerceklestirmeksizin feshedebilir. 60
              gunluk sure boyunca sozlesme devam eder ve fesih suresi
              tamamlaninca sozlesme feshi tamamlanir.
            </p>
            <p className="mt-3">
              SAGLAYICI&apos;nin sozlesmeden kaynaklanan yukumluluklerinden
              herhangi birisini telafi edilemeyecek nitelikte ihlal etmesi
              halinde MUSTERI, sozlesmeyi derhal feshedebilir.
            </p>
          </section>

          {/* Veri Iadesi */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              8. Sozlesme Sonu Veri Iadesi
            </h2>
            <p>
              Sozlesmenin sona ermesi halinde MUSTERI, 30 gun icinde
              verilerini disa aktarmakla yukumludur. Bu surenin sonunda
              SAGLAYICI, yasal saklama yukumlulukleri sakli kalmak kaydiyla
              MUSTERI verilerini silme/anonimlesirme hakkina sahiptir.
            </p>
          </section>

          {/* Uygulanacak Hukuk */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              9. Uygulanacak Hukuk
            </h2>
            <p>
              Isbu iptal ve iade politikasi, 6502 sayili Tuketicinin Korunmasi
              Hakkinda Kanun, Mesafeli Sozlesmeler Yonetmeligi ve ilgili diger
              mevzuat hukumleri cercevesinde duzenlenmistir. Dogacak
              ihtilaflarda Istanbul (Caglayan) Mahkemeleri ve Icra Mudurlulekri
              yetkilidir.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-border pt-8">
            <h2 className="text-base font-semibold text-foreground mb-3">
              Iletisim
            </h2>
            <p>
              Iptal ve iade talepleriniz icin asagidaki kanallardan
              ulasabilirsiniz:
            </p>
            <div className="mt-3 space-y-1">
              <p>
                <span className="font-medium text-foreground">E-posta: </span>
                info@baglac.com.tr
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Firma Unvani:{" "}
                </span>
                D-OPTION DANISMANLIK VE TEKNOLOJI HIZMETLERI A.S.
              </p>
              <p>
                <span className="font-medium text-foreground">Adres: </span>
                Fulya Mah. Buyukdere Cad. Hukukcular Sitesi No:24 Kat:3 D:24
                Sisli / Istanbul
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
