# Project Notes

## Zoneless change detection (Angular 22)

This app bootstraps zoneless (Angular 22 default for `bootstrapModule`, even with
NgModules and no zone.js config change). Template event bindings (`(click)`,
`(input)`) still auto-trigger change detection, but any component state set from
a non-template async source (RxJS subscription, `setTimeout`/`setInterval`,
`Promise`) will NOT update the view on its own.

**Rule:** after setting state from such a source, call `this.cdr.detectChanges()`
(inject `ChangeDetectorRef` as `cdr`).
