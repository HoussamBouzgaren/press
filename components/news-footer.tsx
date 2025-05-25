import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function NewsFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex space-x-4 space-x-reverse">


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
       
        </div>
      </div>
    </footer>
  )
}
