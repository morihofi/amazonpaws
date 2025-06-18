'use client';
import type { Image as PawImage, PawPrint } from "@/types/pawPrint";
import styles from "../page.module.css";
import { useActionState } from "react";
import { editOrCreatePrint } from "@/app/edit/actions/editOrCreatePrint";

type EditorProps = {
    print: PawPrint | undefined;
    preSignedUrl?: string
};

function ImageEditor({ image }: { image: PawImage | null | undefined }) {
    return <>
        <label>Image (File or URL)</label>
        <input name="src" type="file" accept="image/*" />
        <input name="removeImage" id="removeImage" type="checkbox" />
        <label htmlFor={"removeImage"}>Remove Image</label>
        <label>Caption</label>
        <input name="caption" defaultValue={image?.caption ?? ""} />
        <label>Alt-Text</label>
        <input name="alt" defaultValue={image?.alt ?? ""} />
    </>
}

function Preview({ src }: { src: string | undefined }) {
    if (src) return <img src={src} alt="" style={{maxHeight: "200px", maxWidth: "100%"}} />
    return <></>
}

export function Editor({ print, preSignedUrl }: EditorProps) {
    const [state, action, pending] = useActionState(editOrCreatePrint, {pawPrint: print, preSignedUrl: preSignedUrl})
    const img = state.preSignedUrl ?? state.pawPrint?.image?.src ?? undefined;

    return <>
        <form className={styles.editor} action={action}>
            {pending && <p>Saving...</p>}
            {state.pawPrint?.id ? <input type="hidden" name="id" defaultValue={state.pawPrint.id} /> : <span/>}
            <div>
                <label>Heading</label>
                <input name="heading" defaultValue={state.pawPrint?.heading ?? ""} required={true} />
            </div>
            <div>
                <label>Date</label>
                <input name="date" type="date" defaultValue={state.pawPrint?.date ?? ""} required={true} />
            </div>
            <div>
                <label>Text</label>
                <textarea name="text" defaultValue={state.pawPrint?.text ?? ""} required={true} />
            </div>
            <div>
                <label>Tags (Comma separated)</label>
                <input name="tags" defaultValue={state.pawPrint?.tags.join(", ") ?? ""} required={true} />
            </div>
            <div>
                <label>Sources (New-line separated)</label>
                <textarea name="sources" defaultValue={state.pawPrint?.sources.join("\n") ?? ""} required={true} />
            </div>
            <div>
                <h3>Image</h3>
                <Preview src={img} />
                <ImageEditor image={state.pawPrint?.image} />
            </div>
            <input type="submit" value="Save" />
            {pending && <p>Saving...</p>}
            {state.error && <p>{state.error}</p>}
        </form>
    </>
}