import { ragChat } from "@/lib/rag-chat"

interface Pageprops {
    params: {
        url: string | string[] | undefined
    }
}

function reconstructUrl({url}: {url:string[]}) {
    const decodedComponents = url.map((component) => decodeURIComponent(component))
}

const Page = ({ params }: Pageprops) => {
    const reconstructedUrl = reconstructUrl({ url: params.url as string[]})
    console.log(params)
}