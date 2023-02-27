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

export interface DfnOptions {};

@extension<DfnOptions>({ defaultOptions: {}})
export default class DfnExtension extends MarkExtension<DfnOptions> {
  get name() {
    return "dfn";
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
          tag: "dfn",
          getAttrs: extra.parse,
        },
        ...(override.parseDOM ?? []),
      ],
      toDOM: (node) => {
        return ["dfn", extra.dom(node), 0];
      },
    };
  }

  @command()
  toggleDfn(selection: PrimitiveSelection): CommandFunction {
    return toggleMark({ type: this.type, selection });
  }

  @command()
  setDfn(selection: PrimitiveSelection): CommandFunction {
    return ({ tr, dispatch }) => {
      const { from, to } = getTextSelection(selection ?? tr.selection, tr.doc);
      dispatch?.(tr.addMark(from, to, this.type.create()));

      return true;
    };
  }

  @command()
  removeDfn(selection: PrimitiveSelection): CommandFunction {
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
