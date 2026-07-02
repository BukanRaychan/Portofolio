"use client";

import { useEffect, useRef, useState, type DragEvent } from "react";
import { useFormStatus } from "react-dom";
import { Paperclip, CheckCircle, UploadSimple } from "@phosphor-icons/react";

// File input with a "file selected" indicator, drag-and-drop, and optional
// multi-file support. Clears itself when the surrounding form finishes
// submitting (so it resets after you click Save).
export function FileInput({
  name,
  // Explicit extensions alongside image/* — on Windows the picker can hide
  // .jpeg/.jfif under a bare "image/*" depending on MIME registry associations.
  accept = "image/*,.jpg,.jpeg,.jfif,.png,.webp,.gif,.svg",
  multiple = false,
}: {
  name: string;
  accept?: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // Reset once the form's submission completes (Save clicked → done).
  const { pending } = useFormStatus();
  const [wasPending, setWasPending] = useState(pending);
  if (pending !== wasPending) {
    setWasPending(pending);
    if (!pending && files.length > 0) setFiles([]);
  }

  // Keep the real input in sync when we clear (form.reset doesn't touch React).
  useEffect(() => {
    if (files.length === 0 && inputRef.current) inputRef.current.value = "";
  }, [files]);

  // Assign a dropped/selected list to the underlying input so it submits, and
  // mirror it into state for the label.
  function assign(list: FileList | null) {
    if (!list || list.length === 0) return;
    const arr = Array.from(list).slice(0, multiple ? undefined : 1);
    const dt = new DataTransfer();
    arr.forEach((f) => dt.items.add(f));
    if (inputRef.current) inputRef.current.files = dt.files;
    setFiles(arr);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    assign(e.dataTransfer.files);
  }

  const count = files.length;
  const label =
    count === 0
      ? "Choose file or drop here"
      : count === 1
        ? files[0].name
        : `${count} files selected`;

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        if (!dragOver) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={`flex cursor-pointer items-center gap-2 rounded-lg border border-dashed bg-background px-3 py-2 text-sm outline-none transition-colors duration-150 ease-out focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background ${
        dragOver
          ? "border-accent bg-accent/5"
          : count > 0
            ? "border-accent border-solid"
            : "border-border hover:border-muted"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
      />
      {dragOver ? (
        <UploadSimple weight="bold" className="size-4 shrink-0 text-accent" />
      ) : count > 0 ? (
        <CheckCircle weight="fill" className="size-4 shrink-0 text-accent" />
      ) : (
        <Paperclip className="size-4 shrink-0 text-muted" />
      )}
      <span
        className={`truncate ${count > 0 || dragOver ? "text-foreground" : "text-muted"}`}
      >
        {dragOver ? `Drop image${multiple ? "s" : ""} to upload` : label}
      </span>
      {count > 0 && (
        <span className="ml-auto shrink-0 text-xs font-medium text-accent">
          {count === 1 ? "Selected" : `${count} files`}
        </span>
      )}
    </label>
  );
}
