import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikasi — Baglac",
  description:
    "Baglac gizlilik ve guvenlik politikasi. Kisisel verilerinizin nasil toplandigi, kullanildigi ve korundugu hakkinda bilgi.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-[60px]">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Gizlilik ve Guvenlik Politikasi
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Son guncelleme: 01.01.2026
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-foreground/80">
          {/* Intro */}
          <section>
            <p>
              Platformumuzda sunulan tum hizmetler ve Fulya Mah. Buyukdere Cad.
              Hukukcular Sitesi No:24 Kat:3 D:24 Sisli / Istanbul adresinde
              kayitli D OPTION REKLAM VE DANISMANLIK TICARET LIMITED SIRKETI
              firmamiza aittir ve firmamiz tarafindan isletilir.
            </p>
            <p className="mt-3">
              Firmamiz, cesitli amaclarla kisisel veriler toplayabilir. Asagida,
              toplanan kisisel verilerin nasil ve ne sekilde toplandigi, bu
              verilerin nasil ve ne sekilde korundugu belirtilmistir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Kisisel Verilerin Toplanmasi
            </h2>
            <p>
              Uyelik veya platformumuz uzerindeki cesitli form ve anketlerin
              doldurulmasi suretiyle uyelerin kendileriyle ilgili bir takim
              kisisel bilgileri (isim-soy isim, firma bilgileri, telefon, adres
              veya e-posta adresleri gibi) platformumuz tarafindan isin dogasi
              geregi toplanmaktadir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Kampanya ve Bilgilendirme
            </h2>
            <p>
              Firmamiz bazi donemlerde musterilerine ve uyelerine kampanya
              bilgileri, yeni urunler hakkinda bilgiler, promosyon teklifleri
              gonderebilir. Uyelerimiz bu gibi bilgileri alip almama konusunda
              her turlu secimi uye olurken yapabilir, sonrasinda uye girisi
              yaptiktan sonra hesap bilgileri bolumunden bu secimi
              degistirebilir ya da kendisine gelen bilgilendirme iletisindeki
              linkle bildirim yapabilir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Ucuncu Kisilerle Paylasim
            </h2>
            <p>
              Platformumuz uzerinden veya e-posta ile gerceklestirilen onay
              surecinde, uyelerimiz tarafindan platformumuza elektronik ortamdan
              iletilen kisisel bilgiler, uyelerimiz ile yaptigimiz
              &quot;Hizmet Sartlari&quot; ile belirlenen amaclar ve kapsam
              disinda ucuncu kisilere aciklanmayacaktir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              IP Adresi Kullanimi
            </h2>
            <p>
              Sistemle ilgili sorunlarin tanimlanmasi ve verilen hizmet ile
              ilgili cikabilecek sorunlarin veya uyusmazliklarin hizla cozulmesi
              icin, firmamiz, uyelerinin IP adresini kaydetmekte ve bunu
              kullanmaktadir. IP adresleri, kullanicilari genel bir sekilde
              tanimlamak ve kapsamli demografik bilgi toplamak amaciyla da
              kullanilabilir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Dogrudan Pazarlama ve Istatistik
            </h2>
            <p>
              Firmamiz, Hizmet Sartlari ile belirlenen amaclar ve kapsam
              disinda da, talep edilen bilgileri kendisi veya isbirligi icinde
              oldugu kisiler tarafindan dogrudan pazarlama yapmak amaciyla
              kullanabilir. Kisisel bilgiler, gerektiginde kullaniciyla temas
              kurmak icin de kullanilabilir.
            </p>
            <p className="mt-3">
              Firmamiz tarafindan talep edilen bilgiler veya kullanici
              tarafindan saglanan bilgiler veya platformumuz uzerinden yapilan
              islemlerle ilgili bilgiler; firmamiz ve isbirligi icinde oldugu
              kisiler tarafindan, uyelerimizin kimligi ifsa edilmeden cesitli
              istatistiksel degerlendirmeler, veri tabani olusturma ve pazar
              arastirmalarinda kullanilabilir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Gizlilik Taahhutleri
            </h2>
            <p>
              Firmamiz, gizli bilgileri kesinlikle ozel ve gizli tutmayi, bunu
              bir sir saklama yukumu olarak addetmeyi ve gizliligin saglanmasi
              ve surdurmesi, gizli bilginin tamaminin veya herhangi bir
              kisminin kamu alanina girmesini veya yetkisiz kullanimini veya
              ucuncu bir kisiye ifsasini onlemek icin gerekli tum tedbirleri
              almayi ve gerekli ozeni gostermeyi taahhut etmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Kredi Karti Guvenligi
            </h2>
            <p>
              Firmamiz, platformumuz uzerinden odeme yapan kredi karti
              sahiplerinin guvenligini ilk planda tutmaktadir. Kredi karti
              bilgileriniz hicbir sekilde sistemimizde saklanmamaktadir.
            </p>
            <p className="mt-3">
              Platformumuz, cevrimici odemelerin guvenligini
              onceliklendirir. Kredi karti ile odeme islemleri, yetkili odeme
              hizmet saglayicisi/odeme kurulusu altyapisi uzerinden
              gerceklestirilir.
            </p>
            <p className="mt-3">
              Kart numarasi, CVV/CVC, son kullanma tarihi gibi kart verileri
              firmamiz tarafindan goruntulenmez, islenmez ve saklanmaz; ilgili
              veriler dogrudan odeme kurulusu tarafindan islenir. Firmamiz
              yalnizca islem sonucu (basarili/basarisiz), islem referansi,
              tarih/saat ve faturalama amacli sinirli kayitlari saklayabilir.
            </p>
            <p className="mt-3">
              Odeme sayfalari ve veri iletimi, guncel guvenlik standartlari
              (orn. TLS) ile sifrelenir. Gerektiginde 3D Secure gibi ek
              dogrulama adimlari devreye alinabilir.
            </p>
            <p className="mt-3">
              Musteri hizmetlerine ileteceginiz e-postalarda asla kredi karti
              numaranizi veya guvenlik kodunuzu paylasmayiniz.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Ucuncu Taraf Web Siteleri ve Uygulamalar
            </h2>
            <p>
              Platformumuz, web sitesi dahilinde baska sitelere link verebilir.
              Firmamiz, bu linkler vasitasiyla erisilen sitelerin gizlilik
              uygulamalari ve iceriklerine yonelik herhangi bir sorumluluk
              tasimamaktadir. Firmamiza ait sitede yayinlanan reklamlar,
              reklamcilik yapan is ortaklarimiz araciligi ile kullanicilarimiza
              dagitilir. Is bu sozlesmedeki Gizlilik Politikasi Prensipleri,
              sadece platformumuzun kullanimina iliskindir, ucuncu taraf web
              sitelerini kapsamaz.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Istisnai Haller
            </h2>
            <p>
              Asagida belirtilen sinirli hallerde firmamiz, isbu
              &quot;Gizlilik Politikasi&quot; hukumleri disinda kullanicilara
              ait bilgileri ucuncu kisilere aciklayabilir:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                Kanun, Kanun Hukmunde Kararname, Yonetmelik v.b. yetkili hukuki
                otorite tarafindan cikarilan ve yururlukte olan hukuk
                kurallarinin getirdigi zorunluluklara uymak;
              </li>
              <li>
                Platformumuzun kullanicilarla akdettigi &quot;Hizmet
                Sartlari&quot;nin ve diger sozlesmelerin gereklerini yerine
                getirmek ve bunlari uygulamaya koymak amaciyla;
              </li>
              <li>
                Yetkili idari ve adli otorite tarafindan usulune gore
                yurutulen bir arastirma veya sorusturmanin yurutumu amaciyla
                kullanicilarla ilgili bilgi talep edilmesi;
              </li>
              <li>
                Kullanicilarin haklari veya guvenliklerini korumak icin bilgi
                vermenin gerekli oldugu haller.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              E-posta Guvenligi
            </h2>
            <p>
              Platformumuzun Musteri Hizmetleri&apos;ne, herhangi bir
              abonelik/isleminizle ilgili olarak gonderece giniz e-postalarda,
              asla kredi karti numaranizi veya sifrelerinizi yazmayiniz.
              E-postalarda yer alan bilgiler ucuncu sahislar tarafindan
              gorulebilir. Firmamiz e-postalarinizdan aktarilan bilgilerin
              guvenligini hicbir kosulda garanti edemez.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Tarayici Cerezleri
            </h2>
            <p>
              Firmamiz, platformumuzu ziyaret eden kullanicilar ve
              kullanicilarin web sitesini kullanimi hakkindaki bilgileri teknik
              bir iletisim dosyasi (Cerez-Cookie) kullanarak elde edebilir.
              Bahsi gecen teknik iletisim dosyalari, ana bellekte saklanmak
              uzere bir internet sitesinin kullanicinin tarayicisina (browser)
              gonderdigi kucuk metin dosyalaridir.
            </p>
            <p className="mt-3">
              Teknik iletisim dosyasi, siteyi kac kisinin ziyaret ettigini, bir
              kisinin siteyi hangi amacla, kac kez ziyaret ettigini ve ne kadar
              sitede kaldiklarini hakkinda istatistiksel bilgileri elde etmeye
              ve kullanicilar icin ozel tasarlanmis kullanici sayfalarindan
              dinamik olarak reklam ve icerik uretilmesine yardimci olur.
            </p>
            <p className="mt-3">
              Tarayicilarin pek cogu basta teknik iletisim dosyasini kabul eder
              bicimde tasarlanmistir; ancak kullanicilar dilerse teknik iletisim
              dosyasinin gelmemesi veya gonderildiginde uyari verilmesini
              saglayacak bicimde ayarlari degistirebilirler.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Politika Degisiklikleri
            </h2>
            <p>
              Firmamiz, isbu &quot;Gizlilik Politikasi&quot; hukumlerini
              diledigi zaman sitede yayinlamak veya kullanicilara elektronik
              posta gondermek suretiyle degistirebilir. Gizlilik Politikasi
              hukumleri degistigi takdirde, yayinlandigi tarihte yururluk
              kazanir.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-border pt-8">
            <h2 className="text-base font-semibold text-foreground mb-3">
              Iletisim
            </h2>
            <p>
              Gizlilik politikamiz ile ilgili her turlu soru ve onerileriniz
              icin info@baglac.com.tr adresine e-mail gonderebilirsiniz.
            </p>
            <div className="mt-3 space-y-1">
              <p>
                <span className="font-medium text-foreground">
                  Firma Unvani:{" "}
                </span>
                D OPTION REKLAM VE DANISMANLIK TICARET LIMITED SIRKETI
              </p>
              <p>
                <span className="font-medium text-foreground">Adres: </span>
                Fulya Mah. Buyukdere Cad. Hukukcular Sitesi No:24 Kat:3 D:24
                Sisli / Istanbul
              </p>
              <p>
                <span className="font-medium text-foreground">Web: </span>
                baglac.com.tr
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
