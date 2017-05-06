import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        if(params['id']!==undefined) {
          this.server = this.serversService.getServer(parseInt(params['id'], 10));
        }
      }
    );
  }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit']);
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'merge' });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
