import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function NewsFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">الشرق الأوسط</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              صحيفة عربية دولية تهتم بآخر الأخبار السياسية والاقتصادية والثقافية والرياضية من المنطقة والعالم. نسعى
              لتقديم تغطية شاملة ومتوازنة للأحداث الجارية.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                فيسبوك
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                تويتر
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                إنستغرام
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                يوتيوب
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">الأقسام</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/politics" className="hover:text-white transition-colors">
                  سياسة
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-white transition-colors">
                  اقتصاد
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-white transition-colors">
                  رياضة
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  تكنولوجيا
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-white transition-colors">
                  ثقافة
                </Link>
              </li>
              <li>
                <Link href="/world" className="hover:text-white transition-colors">
                  عالمي
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">خدماتنا</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-white transition-colors">
                  النشرة الإخبارية
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>&copy; 2024 الشرق الأوسط. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">
              الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              الشروط
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              خريطة الموقع
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
