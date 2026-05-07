import DataTables, { ApiRowMethods, Context, Api } from 'datatables.net';
export { default } from 'datatables.net';

declare function modal(options?: {
    header?: (row: ApiRowMethods) => string;
}): ResponsiveDisplay;

declare class Responsive {
    static breakpoints: {
        name: string;
        width: number;
    }[];
    static defaults: Defaults;
    static display: {
        childRow: ResponsiveDisplay;
        childRowImmediate: ResponsiveDisplay;
        modal: typeof modal;
    };
    static renderer: Record<string, () => ResponsiveRenderer>;
    static version: string;
    private c;
    private s;
    constructor(dt: Context | Api, opts: Config);
    private _init;
    /**
     * Get and store nodes from a cell - use for node moving renderers
     *
     * @param dt DT instance
     * @param row Row index
     * @param col Column index
     */
    childNodes(dt: Api, row: number, col: number): any[];
    /**
     * Insert a `col` tag into the correct location in a `colgroup`.
     *
     * @param colGroup The `colgroup` tag
     * @param colEl Array of `col` tags
     * @param idx Column index
     */
    private _colGroupAttach;
    /**
     * Restore nodes from the cache to a table cell
     *
     * @param dt DT instance
     * @param row Row index
     * @param col Column index
     */
    private _childNodesRestore;
    /**
     * Calculate the visibility for the columns in a table for a given
     * breakpoint. The result is pre-determined based on the class logic if
     * class names are used to control all columns, but the width of the table
     * is also used if there are columns which are to be automatically shown and
     * hidden.
     *
     * @param  breakpoint Breakpoint name to use for the calculation
     * @return {array} Array of boolean values initiating the visibility of each
     *   column.
     */
    private _columnsVisibility;
    /**
     * Create the internal `columns` array with information about the columns
     * for the table. This includes determining which breakpoints the column
     * will appear in, based upon class names in the column, which makes up the
     * vast majority of this method.
     */
    private _classLogic;
    /**
     * Update the cells to show the correct control class / button
     */
    private _controlClass;
    /**
     * Show the details for the child row
     *
     * @param  row    API instance for the row
     * @param  update Update flag
     */
    private _detailsDisplay;
    /**
     * Initialisation for the details handler
     */
    private _detailsInit;
    /**
     * Get the details to pass to a renderer for a row
     * @param rowIdx Row index
     */
    private _detailsObj;
    /**
     * Find a breakpoint object from a name
     *
     * @param  name Breakpoint name to find
     * @return Breakpoint description object
     */
    private _find;
    /**
     * Re-create the contents of the child rows as the display has changed in
     * some way.
     */
    private _redrawChildren;
    /**
     * Alter the table display for a resized viewport. This involves first
     * determining what breakpoint the window currently is in, getting the
     * column visibilities to apply and then setting them.
     *
     * @param forceRedraw Force a redraw
     */
    private _resize;
    /**
     * Determine the width of each column in the table so the auto column hiding
     * has that information to work with. This method is never going to be 100%
     * perfect since column widths can change slightly per page, but without
     * seriously compromising performance this is quite effective.
     */
    private _resizeAuto;
    /**
     * Get the state of the current hidden columns - controlled by Responsive
     * only
     */
    private _responsiveOnlyHidden;
    /**
     * Set a column's visibility.
     *
     * We don't use DataTables' column visibility controls in order to ensure
     * that column visibility can Responsive can no-exist. Since only IE8+ is
     * supported (and all evergreen browsers of course) the control of the
     * display attribute works well.
     *
     * @param col      Column index
     * @param showHide Show or hide (true or false)
     */
    private _setColumnVis;
    /**
     * Set a column's visibility, taking into account multiple rows
     * in a header / footer and colspan attributes
     * @param col
     * @param showHide
     * @param structure
     */
    private _setHeaderVis;
    /**
     * How many columns should this cell span
     *
     * @param row Header structure row
     * @param idx The column index of the cell to span
     */
    private _colspan;
    /**
     * Update the cell tab indexes for keyboard accessibility. This is called on
     * every table draw - that is potentially inefficient, but also the least
     * complex option given that column visibility can change on the fly. Its a
     * shame user-focus was removed from CSS 3 UI, as it would have solved this
     * issue with a single CSS statement.
     */
    private _tabIndexes;
}

declare module 'datatables.net' {
    interface Options {
        /**
         * Responsive extension options
         */
        responsive?: boolean | Config;
    }
    interface Defaults {
        /**
         * Responsive extension defaults
         */
        responsive?: Config;
    }
    interface Context {
        _responsive: Responsive;
    }
    interface ColumnContext {
        /**
         * Set column's visibility priority
         */
        responsivePriority?: number;
    }
    interface Context {
        responsive: Responsive;
    }
    interface Api<T> {
        /**
         * Responsive methods container
         *
         * @returns Api for chaining with the additional Responsive methods
         */
        responsive: ApiResponsiveMethods<T>;
    }
    interface ApiColumnMethods<T> {
        /**
         * Get the responsive visibility state of a column in the table
         */
        responsiveHidden(): boolean;
    }
    interface ApiColumnsMethods<T> {
        /**
         * Get the responsive visibility state of columns in the table
         */
        responsiveHidden(): Api<boolean>;
    }
    interface DataTablesStatic {
        /**
         * Responsive class
         */
        Responsive: typeof Responsive;
    }
}
interface Defaults {
    /**
     * Set the breakpoints for a responsive instance
     */
    breakpoints: Array<ResponsiveBreakpoint>;
    /**
     * Enable / disable auto hiding calculations. It can help to increase
     * performance slightly if you disable this option, but all columns would
     * need to have breakpoint classes assigned to them
     */
    auto: true;
    /**
     * Enable and configure the child rows shown by Responsive for collapsed
     * tables.
     */
    details: boolean | ConfigResponsiveDetails;
    /**
     * The data type to request when obtaining data from the DataTable for a
     * specific cell. See the columns.render and cell().render() documentation
     * for full details.
     */
    orthogonal: string;
}
interface Config extends Partial<Defaults> {
}
interface ApiResponsiveMethods<T> extends Api<T> {
    /**
     * Determine if Responsive has hidden any columns in the table
     *
     * @returns true if columns have been hidden, false if not
     */
    hasHidden(): boolean;
    /**
     * DEPRECATED
     * Calculate the cell index from a li details element
     *
     * @param li The li node (or a jQuery collection containing the node) to get the cell index for.
     * @returns Cell object that contains the properties row and column. This object can be used as a DataTables DataTable.CellSelector.
     */
    index(li: HTMLElement): object;
    /**
     * Recalculate the column breakpoints based on the class information of the column header cells
     *
     * @returns DataTables API instance
     */
    rebuild(): Api<T>;
    /**
     * Recalculate the widths used by responsive after a change in the display.
     *
     * @returns DataTables Api instance
     */
    recalc(): Api<T>;
}
interface ConfigResponsiveDetails {
    /**
     * Define how the hidden information should be displayed to the end user.
     *
     * @param row DataTables API instance for the table in question which is prepopulated with the row that is being acted upon - i.e. the result from row().
     * @param update This parameter is used to inform the function what has triggered the function call:
     * @param render The data to be shown - this is given as a function so it will be executed only when required (i.e. there is no point in gather data to display if the display function is simply going to hide it). The string returned by this function is that given by the responsive.details.renderer function. It accepts no input parameters.
     * @returns boolean true if the display function has shown the hidden data, false
     */
    display?: ResponsiveDisplay;
    /**
     * Define the renderer used to display the child rows.
     *
     * @param api DataTables API instance for the table in question
     * @param rowIdx Row index for the row that the renderer is being asked to render. Use the row() and / or cells() methods to get information from the API about the row so the information can be rendered.
     * @param columns Since 2.0.0: An array of objects containing information about each column in the DataTable. The array length is exactly equal to the number of columns in the DataTable, with each column represented by a DataTable in index order.
     * @returns boolean | string  `false` - Do not display a child row. Or a string - The information to be shown in the details display, including any required HTML.
     */
    renderer?: ResponsiveRenderer | string;
    /**
     * As a number it is a column index to the show / hide control should be attached. This can be >=0 to count columns from the left, or <0 to count from the right.
     *
     * As a string, this option is used as a jQuery selector to determine what element(s) will activate the show / hide control for the details child rows. This provides the ability to use any element in a table - for example you can use the whole row, or a single img element in the row.
     */
    target?: number | string;
    /**
     * The child row display type to use. This can be one of: `inline`, `column` or `none`
     */
    type: boolean | string;
}
interface ResponsiveBreakpoint {
    /**
     * Breakpoint name
     */
    name: string;
    /**
     * Breakpoint width
     */
    width: number;
}
interface ResponsiveRenderer {
    /**
     * Rendering functions for Responsive
     */
    (this: Responsive, api: Api<any>, rowIdx: number, columns: ResponsiveRowDetails[]): Node | false;
    _responsiveMovesNodes?: boolean;
}
interface ResponsiveDisplay {
    /**
     * Display function for Responsive.
     *
     * @param row DataTables API row() for the row in question
     * @param update Indicates if this is a redraw (true) or a fresh draw
     *   (false)
     * @param render Rendering function to be executed to get the data to show
     *   for the row
     */
    (row: ApiRowMethods, update: boolean, render: () => ReturnType<ResponsiveRenderer>, closeCallback: () => void): boolean;
}
interface ResponsiveRowDetails {
    className: string | null;
    columnIndex: number;
    data: any;
    hidden: boolean;
    rowIndex: number;
    title: string;
}
interface Column {
    className: string;
    includeIn: string[];
    auto: boolean;
    control: boolean;
    minWidth: number;
    never: boolean;
    priority: number;
}
interface Settings {
    childNodeStore: Record<string, Node[]>;
    columns: Column[];
    current: boolean[];
    details: ConfigResponsiveDetails;
    dt: Api;
    timer: ReturnType<typeof setTimeout> | null;
}

export type { ApiResponsiveMethods, Column, Config, ConfigResponsiveDetails, Defaults, ResponsiveBreakpoint, ResponsiveDisplay, ResponsiveRenderer, ResponsiveRowDetails, Settings };
