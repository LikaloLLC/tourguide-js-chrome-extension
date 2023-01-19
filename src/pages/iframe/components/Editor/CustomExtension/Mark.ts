import {
  extension,
  ApplySchemaAttributes, 
  MarkSpecOverride,
  MarkExtensionSpec,
  PrimitiveSelection,
  CommandFunction,
  ExtensionTag,
  MarkExtension,
  command,
  toggleMark,
  getTextSelection,
} from "@remirror/core";

export interface MarkOptions {};

@extension<MarkOptions>({ defaultOptions: {}})
export default class DocsieMarkExtension extends MarkExtension<MarkOptions> {
  get name() {
    return "mark";
  }

  createTags() {
    return [ExtensionTag.FormattingMark, ExtensionTag.FontStyle];
  }

  createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec {
    return {
      ...override,
      attrs: extra.defaults(),
      parseDOM: [
        {
          tag: "mark",
          getAttrs: extra.parse,
        },
        ...(override.parseDOM ?? []),
      ],
      toDOM: (node) => {
        return ["mark", extra.dom(node), 0];
      },
    };
  }

  @command()
  toggleDocsieMark(selection: PrimitiveSelection): CommandFunction {
    return toggleMark({ type: this.type, selection });
  }

  @command()
  setDocsieMark(selection: PrimitiveSelection): CommandFunction {
    return ({ tr, dispatch }) => {
      const { from, to } = getTextSelection(selection ?? tr.selection, tr.doc);
      dispatch?.(tr.addMark(from, to, this.type.create()));

      return true;
    };
  }

  @command()
  removeDocsieMark(selection: PrimitiveSelection): CommandFunction {
    return ({ tr, dispatch }) => {
      const { from, to } = getTextSelection(selection ?? tr.selection, tr.doc);

      if (!tr.doc.rangeHasMark(from, to, this.type)) {
        return false;
      }

      dispatch?.(tr.removeMark(from, to, this.type));

      return true;
    };
  }
}
