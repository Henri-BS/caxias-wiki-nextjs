import { ImageCard } from "../components/ImageCard";
import { Template } from "../components/Template";


export default function GaleriaPage() {
    return (
        <Template>            
            <h1>Galeria</h1>

            <section className="grid grid-cols-4 gap-8">
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>            
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
                <ImageCard nome="Guerra" tamanho="10mb" dataUpload="01/01/2024" src="https://w.wallha.com/ws/5/fLJMyprK.jpg"/>           
            </section>
        </Template>
    );
}