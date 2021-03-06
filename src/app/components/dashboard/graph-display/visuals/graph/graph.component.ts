import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit} from '@angular/core';
import {D3Service, ForceDirectedGraph} from '../../d3';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="options.width" [attr.height]="options.height">
      <g [zoomableOf]="svg">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refY="3" orient="auto" markerUnits="strokeWidth" refX="9">
            <path d="M0,0 L0,6 L9,3 z" fill="E5E5E5"></path>
          </marker>
        </defs>
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
           (click)="drawer.toggle()"
           (mouseover)="set_highlight(node)"
           (mouseout)="exit_highlight(node)"
           routerLink="/graph/{{node.group}}"
           [draggableNode]="node"
           [draggableInGraph]="forceDirectedGraph"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('nodes') nodes;
  @Input('links') links;
  @Input('drawer') drawer;

  forceDirectedGraph: ForceDirectedGraph;

  private _options: { width, height };

  highlight_node: Node;

  focus_node: Node;

  highlight_color = 'blue';

  highlight_trans = 0.1;

  svg = d3.select('body').append('svg');

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.forceDirectedGraph.initSimulation(this.options);
  }


  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {

    /** Receiving an initialized simulated forceDirectedGraph from our custom d3 service */
    this.forceDirectedGraph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.forceDirectedGraph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });

  }

  ngAfterViewInit() {
    this.forceDirectedGraph.initSimulation(this.options);
  }

  // TODO find a cleaner way to set size
  get options() {
    return this._options = {
      width: document.body.clientWidth - 17,
      height: document.body.clientHeight - 70
    };
  }

  set_highlight(node) {
    this.links.forEach(link => {
      if (link.source.id === node.id || link.target.id === node.id) {
        link.source.stroke = 'blue';
        link.target.stroke = 'blue';
        link.color = 'blue';
      }
    });
  }

  exit_highlight(node) {
    this.links.forEach(link => {
      if (link.source.id === node.id || link.target.id === node.id) {
        link.source.stroke = 'white';
        link.target.stroke = 'white';
        link.color = '#888';
      }
    });
  }
}
