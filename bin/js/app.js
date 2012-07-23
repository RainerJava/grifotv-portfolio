(function() {
  var AboutPageView, AbstractPageView, AbstractView, AppConfig, AppRouter, AppService, AppState, AppView, BlogCollection, BlogModel, BlogView, BrandCollection, BrandModel, BrandView, CreditCollection, CreditGroupCollection, CreditGroupModel, CreditGroupView, CreditModel, CreditView, ExperienceCollection, ExperienceGroupCollection, ExperienceGroupModel, ExperienceGroupView, ExperienceModel, FlickrCollection, FlickrModel, FlickrView, GithubCollection, GithubModel, GithubView, HeaderBgView, HeaderView, LabelCollection, LabelModel, NavView, ProfileCollection, ProfileModel, ProfileView, ProjectCollection, ProjectModel, ProjectPageView, ProjectsPageView, ShareView, StreamPageView, TagCollection, TagGroupCollection, TagGroupModel, TagGroupView, TagModel, TagView, TagsPageView, ThumbnailView, TwitterCollection, TwitterModel, TwitterView, Utils, WordStreamLineView, YoutubeCollection, YoutubeModel, YoutubeView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    window.grifo = {
      appState: null,
      appConfig: null,
      appView: null,
      appRouter: null,
      labelCollection: null,
      brandCollection: null,
      profileCollection: null,
      experienceCollection: null,
      experienceGroupCollection: null,
      tagGroupCollection: null,
      tagCollection: null,
      creditGroupCollection: null,
      creditCollection: null,
      projectCollection: null,
      youtubeCollection: null,
      twitterCollection: null,
      githubCollection: null,
      flickrCollection: null,
      blogCollection: null
    };
    grifo.appState = new AppState();
    grifo.appConfig = new AppConfig();
    grifo.appView = new AppView();
    return grifo.appView.on(AppView.EVENT_DATA_LOADED, function() {
      grifo.appRouter = new AppRouter();
      grifo.appRouter.on(AppRouter.EVENT_HASH_CHANGED, grifo.appView.onHashChanged);
      return grifo.appRouter.start();
    });
  });

  if (!window['console']) {
    window.console = {
      log: function(a) {
        return a;
      },
      dir: function(a) {
        return a;
      }
    };
  }

  AppState = (function() {

    AppState.prototype.isTablet = /ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase());

    AppState.prototype.isMobile = /iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());

    AppState.prototype.isDesktop = false;

    AppState.prototype.currentPage = null;

    AppState.prototype.currentSubPage = null;

    AppState.prototype.currentSubSubPage = null;

    AppState.prototype.previousPage = null;

    AppState.prototype.previousSubPage = null;

    AppState.prototype.previousSubSubPage = null;

    function AppState() {
      var $html, ieVersion, test;
      this.isDesktop = !this.isTablet && !this.isMobile;
      $html = $('html');
      if (this.isMobile) $html.addClass('mobile');
      if (this.isDesktop) $html.addClass('desktop');
      if (this.isTablet) $html.addClass('tablet');
      if (/MSIE/.test(navigator.userAgent)) $html.addClass('ie');
      test = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (test.exec(navigator.userAgent)) {
        ieVersion = parseFloat(RegExp.$1);
        $html.addClass('ie' + ieVersion);
        /*
                    if ieVersion <= 8
                        $html.addClass 'oldie'
                    else
                        $html.addClass 'newie'
        */
      } else {
        $html.addClass('nonie');
      }
    }

    return AppState;

  })();

  AppConfig = (function() {

    AppConfig.prototype.PAGE_PROJECTS = 'projects';

    AppConfig.prototype.PAGE_TAGS = 'tags';

    AppConfig.prototype.PAGE_STREAM = 'stream';

    AppConfig.prototype.PAGE_ABOUT = 'about';

    AppConfig.prototype.PAGE_DEFAULT = null;

    AppConfig.prototype.URL_GDOCS_SS = 'http://spreadsheets.google.com/feeds/list/{KEY}/{WORKSHEET}/public/values?alt=json-in-script&callback=?';

    AppConfig.prototype.KEY_GDOCS_SS = '0AuMegPFV2btJdGFIMWE1V0VvOUFuUlVpWXp3UXlwQ1E';

    AppConfig.prototype.WORKSHEET_LABELS = 'od9';

    AppConfig.prototype.WORKSHEET_BRANDS = 'od6';

    AppConfig.prototype.WORKSHEET_PROFILES = 'od7';

    AppConfig.prototype.WORKSHEET_EXPERIENCES = 'od8';

    AppConfig.prototype.WORKSHEET_EXPERIENCE_GROUPS = 'odb';

    AppConfig.prototype.WORKSHEET_TAGS = 'od4';

    AppConfig.prototype.WORKSHEET_TAG_GROUPS = 'od5';

    AppConfig.prototype.WORKSHEET_CREDITS = 'ocx';

    AppConfig.prototype.WORKSHEET_CREDIT_GROUPS = 'ocw';

    AppConfig.prototype.WORKSHEET_PROJECTS = 'ocz';

    AppConfig.prototype.URL_LABELS = null;

    AppConfig.prototype.URL_BRANDS = null;

    AppConfig.prototype.URL_PROFILES = null;

    AppConfig.prototype.URL_EXPERIENCES = null;

    AppConfig.prototype.URL_EXPERIENCE_GROUPS = null;

    AppConfig.prototype.URL_TAGS = null;

    AppConfig.prototype.URL_TAG_GROUPS = null;

    AppConfig.prototype.URL_CREDITS = null;

    AppConfig.prototype.URL_CREDIT_GROUPS = null;

    AppConfig.prototype.URL_PROJECTS = null;

    AppConfig.prototype.URL_YOUTUBE = 'http://gdata.youtube.com/feeds/api/videos?alt=json-in-script&author={USER_ID}&orderby=published&start-index=1&max-results={MAX_RESULTS}&callback=?';

    AppConfig.prototype.URL_TWITTER = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&include_rts=false&exclude_replies=true&trim_user=false&contributor_details=false&screen_name={USER_ID}&count={MAX_RESULTS}&callback=?';

    AppConfig.prototype.URL_GITHUB = 'https://github.com/{USER_ID}.json?&callback=?';

    AppConfig.prototype.URL_FLICKR = 'http://api.flickr.com/services/feeds/photos_public.gne?id={USER_ID}&lang=en-us&format=json&callback=?';

    AppConfig.prototype.URL_BLOG = 'xml-proxy.php?url=http://blog.grifo.tv/feed/';

    AppConfig.prototype.USER_ID_YOUTUBE = 'grifotvmobile';

    AppConfig.prototype.USER_ID_TWITTER = 'grifotv';

    AppConfig.prototype.USER_ID_GITHUB = 'grifotv';

    AppConfig.prototype.USER_ID_FLICKR = '41688283@N07';

    AppConfig.prototype.MAX_RESULTS_YOUTUBE = 9;

    AppConfig.prototype.MAX_RESULTS_TWITTER = 6;

    AppConfig.prototype.MAX_RESULTS_GITHUB = 6;

    AppConfig.prototype.MAX_RESULTS_FLICKR = 10;

    AppConfig.prototype.MAX_RESULTS_BLOG = 6;

    AppConfig.prototype.SHARE_URL_FACEBOOK = 'http://www.facebook.com/sharer.php?u={URL}';

    AppConfig.prototype.SHARE_URL_TWITTER = 'http://twitter.com/home?status={TEXT}';

    AppConfig.prototype.SNAP_Y_HEADER = 120;

    AppConfig.prototype.SNAP_Y_HEADER_BG = 155;

    function AppConfig() {
      this.PAGE_DEFAULT = this.PAGE_PROJECTS;
      this.URL_GDOCS_SS = this.URL_GDOCS_SS.replace('{KEY}', this.KEY_GDOCS_SS);
      this.URL_LABELS = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_LABELS);
      this.URL_BRANDS = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_BRANDS);
      this.URL_PROFILES = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_PROFILES);
      this.URL_EXPERIENCES = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_EXPERIENCES);
      this.URL_EXPERIENCE_GROUPS = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_EXPERIENCE_GROUPS);
      this.URL_TAGS = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_TAGS);
      this.URL_TAG_GROUPS = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_TAG_GROUPS);
      this.URL_CREDITS = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_CREDITS);
      this.URL_CREDIT_GROUPS = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_CREDIT_GROUPS);
      this.URL_PROJECTS = this.URL_GDOCS_SS.replace('{WORKSHEET}', this.WORKSHEET_PROJECTS);
      this.URL_YOUTUBE = this.URL_YOUTUBE.replace('{USER_ID}', this.USER_ID_YOUTUBE);
      this.URL_TWITTER = this.URL_TWITTER.replace('{USER_ID}', this.USER_ID_TWITTER);
      this.URL_GITHUB = this.URL_GITHUB.replace('{USER_ID}', this.USER_ID_GITHUB);
      this.URL_FLICKR = this.URL_FLICKR.replace('{USER_ID}', this.USER_ID_FLICKR);
      this.URL_YOUTUBE = this.URL_YOUTUBE.replace('{MAX_RESULTS}', this.MAX_RESULTS_YOUTUBE);
      this.URL_TWITTER = this.URL_TWITTER.replace('{MAX_RESULTS}', this.MAX_RESULTS_TWITTER * 2.0);
    }

    return AppConfig;

  })();

  AppService = (function() {

    AppService.prototype.test = false;

    function AppService() {
      console.log(this.test);
    }

    return AppService;

  })();

  Utils = {
    relativeTime: function(timeValue_) {
      var days, elapsed, hours, minutes, months, msPerDay, msPerHour, msPerMinute, msPerMonth, msPerYear, parsedDate, relativeTo, years;
      msPerMinute = 60 * 1000;
      msPerHour = msPerMinute * 60;
      msPerDay = msPerHour * 24;
      msPerMonth = msPerDay * 30;
      msPerYear = msPerDay * 365;
      parsedDate = Date.parse(timeValue_);
      relativeTo = new Date();
      elapsed = relativeTo.getTime() - parsedDate;
      if (elapsed < msPerMinute) {
        return 'less than a minute ago';
      } else if (elapsed < msPerHour) {
        minutes = Math.round(elapsed / msPerMinute);
        if (minutes > 1.0) {
          return minutes + ' minutes ago';
        } else {
          return 'about a minute ago';
        }
      } else if (elapsed < msPerDay) {
        hours = Math.round(elapsed / msPerHour);
        if (hours > 1.0) {
          return hours + ' hours ago';
        } else {
          return 'about an hour ago';
        }
      } else if (elapsed < msPerMonth) {
        days = Math.round(elapsed / msPerDay);
        if (days > 1.0) {
          return days + ' days ago';
        } else {
          return '1 day ago';
        }
      } else if (elapsed < msPerYear) {
        months = Math.round(elapsed / msPerMonth);
        if (months > 1.0) {
          return months + ' months ago';
        } else {
          return '1 month ago';
        }
      } else {
        years = Math.round(elapsed / msPerYear);
        if (years > 1.0) {
          return years + ' years ago';
        } else {
          return '1 year ago';
        }
      }
    },
    linkifyUrls: function(value_) {
      var regexp;
      regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
      return value_.replace(regexp, '<a target=\"_blank\" href=\"$1\">$1</a>');
    },
    linkifyUsers: function(value_) {
      var regexp;
      regexp = /[\@]+([A-Za-z0-9-_]+)/gi;
      return value_.replace(regexp, '<a target=\"_blank\" href=\"http://twitter.com/$1\">@$1</a>');
    },
    linkifyHashes: function(value_) {
      var regexp;
      regexp = /[\#]+([A-Za-z0-9-_]+)/gi;
      return value_.replace(regexp, ' <a target=\"_blank\" href=\"https://twitter.com/search?q=%23$1\">#$1</a> ');
    },
    getWidth: function(value_) {
      var regexp;
      regexp = /(width=")+([0-9-_]+")/gi;
      value_ = value_.match(regexp).toString();
      value_ = value_.replace('width=', '');
      value_ = value_.replace('"', '').replace('"', '');
      return parseInt(value_);
    },
    getHeight: function(value_) {
      var regexp;
      regexp = /(height=")+([0-9-_]+")/gi;
      value_ = value_.match(regexp).toString();
      value_ = value_.replace('height=', '');
      value_ = value_.replace('"', '').replace('"', '');
      return parseInt(value_);
    }
  };

  AppRouter = (function() {

    __extends(AppRouter, Backbone.Router);

    function AppRouter() {
      AppRouter.__super__.constructor.apply(this, arguments);
    }

    AppRouter.EVENT_HASH_CHANGED = 'EVENT_HASH_CHANGED';

    AppRouter.prototype.currentPage = '';

    AppRouter.prototype.routes = {
      ':id': 'hashChanged',
      '/:id': 'hashChanged',
      ':id/': 'hashChanged',
      '/:id/': 'hashChanged',
      ':id/:subid': 'hashChanged',
      '/:id/:subid': 'hashChanged',
      ':id/:subid/': 'hashChanged',
      '/:id/:subid/': 'hashChanged',
      ':id/:subid/:subsubid': 'hashChanged',
      '/:id/:subid/:subsubid': 'hashChanged',
      ':id/:subid/:subsubid/': 'hashChanged',
      '/:id/:subid/:subsubid/': 'hashChanged',
      ':id/:subid/:subsubid/*actions': 'hashChanged',
      '/:id/:subid/:subsubid/*actions': 'hashChanged',
      '*actions': 'default'
    };

    AppRouter.prototype.start = function() {
      return Backbone.history.start();
    };

    AppRouter.prototype.hashChanged = function(id_, subId_, subSubId_, actions_) {
      var currentPage;
      if (id_ == null) id_ = null;
      if (subId_ == null) subId_ = null;
      if (subSubId_ == null) subSubId_ = null;
      if (actions_ == null) actions_ = null;
      if (id_ === grifo.appConfig.PAGE_PROJECTS || id_ === grifo.appConfig.PAGE_TAGS || id_ === grifo.appConfig.PAGE_STREAM || id_ === grifo.appConfig.PAGE_ABOUT) {
        currentPage = '/';
        if (id_) {
          currentPage += id_;
          currentPage += '/';
          if (subId_) {
            currentPage += subId_;
            currentPage += '/';
            if (subSubId_) {
              currentPage += subSubId_;
              currentPage += '/';
            }
          }
        }
        if (currentPage !== this.currentPage) {
          this.currentPage = currentPage;
          _gaq.push(['_trackPageview', this.currentPage]);
          return this.trigger(AppRouter.EVENT_HASH_CHANGED, id_, subId_, subSubId_);
        }
      }
    };

    AppRouter.prototype["default"] = function(actions_) {
      return this.hashChanged(grifo.appConfig.PAGE_DEFAULT);
    };

    AppRouter.prototype.navigateToProject = function(projectId_) {
      var hash;
      if (projectId_ == null) projectId_ = null;
      hash = '//' + grifo.appConfig.PAGE_PROJECTS + '/';
      if (projectId_) hash += projectId_ + '/';
      return this.navigate(hash, {
        trigger: true
      });
    };

    AppRouter.prototype.navigateToTag = function(tagId_) {
      var hash;
      if (tagId_ == null) tagId_ = null;
      hash = '//' + grifo.appConfig.PAGE_TAGS + '/';
      if (tagId_) hash += tagId_ + '/';
      return this.navigate(hash, {
        trigger: true
      });
    };

    return AppRouter;

  })();

  BrandModel = (function() {

    __extends(BrandModel, Backbone.Model);

    function BrandModel() {
      BrandModel.__super__.constructor.apply(this, arguments);
    }

    BrandModel.prototype.defaults = {
      id: '',
      label: '',
      image: '',
      url: '',
      window: '',
      priority: 0.0
    };

    BrandModel.prototype.initialize = function() {
      if (this.get('url').length > 0.0) {
        if (this.get('url').indexOf('#') === 0.0) {
          this.set({
            window: '_self'
          });
        } else {
          this.set({
            window: '_blank'
          });
        }
      }
      return this.set({
        priority: parseFloat(this.get('priority'))
      });
    };

    return BrandModel;

  })();

  CreditGroupModel = (function() {

    __extends(CreditGroupModel, Backbone.Model);

    function CreditGroupModel() {
      CreditGroupModel.__super__.constructor.apply(this, arguments);
    }

    CreditGroupModel.prototype.defaults = {
      id: '',
      label: '',
      project: ''
    };

    return CreditGroupModel;

  })();

  CreditModel = (function() {

    __extends(CreditModel, Backbone.Model);

    function CreditModel() {
      CreditModel.__super__.constructor.apply(this, arguments);
    }

    CreditModel.prototype.defaults = {
      label: '',
      profiles: [],
      group: ''
    };

    return CreditModel;

  })();

  ExperienceGroupModel = (function() {

    __extends(ExperienceGroupModel, Backbone.Model);

    function ExperienceGroupModel() {
      ExperienceGroupModel.__super__.constructor.apply(this, arguments);
    }

    ExperienceGroupModel.prototype.defaults = {
      id: '',
      label: '',
      column: 0
    };

    return ExperienceGroupModel;

  })();

  ExperienceModel = (function() {

    __extends(ExperienceModel, Backbone.Model);

    function ExperienceModel() {
      ExperienceModel.__super__.constructor.apply(this, arguments);
    }

    ExperienceModel.prototype.defaults = {
      left: '',
      right: '',
      plus_url: '',
      window: '',
      group: ''
    };

    ExperienceModel.prototype.initialize = function() {
      if (this.get('plus_url').length > 0.0) {
        if (this.get('plus_url').indexOf('#') === 0.0) {
          return this.set({
            window: '_self'
          });
        } else {
          return this.set({
            window: '_blank'
          });
        }
      }
    };

    return ExperienceModel;

  })();

  LabelModel = (function() {

    __extends(LabelModel, Backbone.Model);

    function LabelModel() {
      LabelModel.__super__.constructor.apply(this, arguments);
    }

    LabelModel.prototype.defaults = {
      id: '',
      label: ''
    };

    return LabelModel;

  })();

  ProfileModel = (function() {

    __extends(ProfileModel, Backbone.Model);

    function ProfileModel() {
      ProfileModel.__super__.constructor.apply(this, arguments);
    }

    ProfileModel.prototype.defaults = {
      id: '',
      label: '',
      url: '',
      window: ''
    };

    ProfileModel.prototype.initialize = function() {
      if (this.get('url').length > 0.0) {
        if (this.get('url').indexOf('#') === 0.0) {
          return this.set({
            window: '_self'
          });
        } else {
          return this.set({
            window: '_blank'
          });
        }
      }
    };

    return ProfileModel;

  })();

  ProjectModel = (function() {

    __extends(ProjectModel, Backbone.Model);

    function ProjectModel() {
      ProjectModel.__super__.constructor.apply(this, arguments);
    }

    ProjectModel.prototype.defaults = {
      id: '',
      index: 0,
      tile_size: 'small',
      short_title: '',
      long_title: '',
      headline: '',
      thumbnail: '',
      url: '',
      video: '',
      copy: '',
      images: [],
      tags: [],
      display_tags: []
    };

    return ProjectModel;

  })();

  TagGroupModel = (function() {

    __extends(TagGroupModel, Backbone.Model);

    function TagGroupModel() {
      TagGroupModel.__super__.constructor.apply(this, arguments);
    }

    TagGroupModel.prototype.defaults = {
      id: '',
      label: ''
    };

    return TagGroupModel;

  })();

  TagModel = (function() {

    __extends(TagModel, Backbone.Model);

    function TagModel() {
      TagModel.__super__.constructor.apply(this, arguments);
    }

    TagModel.prototype.defaults = {
      id: '',
      short_title: '',
      long_title: '',
      group: '',
      selected: false
    };

    return TagModel;

  })();

  BlogModel = (function() {

    __extends(BlogModel, Backbone.Model);

    function BlogModel() {
      BlogModel.__super__.constructor.apply(this, arguments);
    }

    BlogModel.prototype.defaults = {
      title: '',
      url: '',
      description: '',
      date: ''
    };

    return BlogModel;

  })();

  FlickrModel = (function() {

    __extends(FlickrModel, Backbone.Model);

    function FlickrModel() {
      FlickrModel.__super__.constructor.apply(this, arguments);
    }

    FlickrModel.prototype.defaults = {
      title: '',
      url: '',
      image: '',
      date: '',
      is_portrait: false
    };

    return FlickrModel;

  })();

  GithubModel = (function() {

    __extends(GithubModel, Backbone.Model);

    function GithubModel() {
      GithubModel.__super__.constructor.apply(this, arguments);
    }

    GithubModel.prototype.defaults = {
      type: '',
      text: '',
      date: '',
      url: ''
    };

    return GithubModel;

  })();

  TwitterModel = (function() {

    __extends(TwitterModel, Backbone.Model);

    function TwitterModel() {
      TwitterModel.__super__.constructor.apply(this, arguments);
    }

    TwitterModel.prototype.defaults = {
      id: '',
      text: '',
      date: '',
      url: ''
    };

    return TwitterModel;

  })();

  YoutubeModel = (function() {

    __extends(YoutubeModel, Backbone.Model);

    function YoutubeModel() {
      YoutubeModel.__super__.constructor.apply(this, arguments);
    }

    YoutubeModel.prototype.defaults = {
      id: '',
      url: '',
      date: '',
      title: '',
      content: '',
      thumbnail_low: '',
      thumbnail_medium: '',
      is_portrait: false
    };

    return YoutubeModel;

  })();

  BlogCollection = (function() {

    __extends(BlogCollection, Backbone.Collection);

    function BlogCollection() {
      this.parseAndAdd = __bind(this.parseAndAdd, this);
      BlogCollection.__super__.constructor.apply(this, arguments);
    }

    BlogCollection.prototype.model = BlogModel;

    BlogCollection.prototype.load = function() {
      return $.get(this.url, this.parseAndAdd);
    };

    BlogCollection.prototype.parseAndAdd = function(response_) {
      this.add(this.parse(response_));
      return grifo.appView.onLoad();
    };

    BlogCollection.prototype.parse = function(response_) {
      var modelsArray;
      modelsArray = [];
      $(response_).find('item').each(function() {
        var $item, itemDate, itemDescription, itemModel, itemTitle, itemUrl;
        $item = $(this);
        itemTitle = $item.find('title').text();
        itemUrl = $item.find('link').text();
        itemDescription = $item.find('description').text();
        itemDate = Utils.relativeTime($item.find('pubDate').text());
        itemModel = new BlogModel({
          title: itemTitle,
          url: itemUrl,
          description: itemDescription,
          date: itemDate
        });
        modelsArray.push(itemModel);
        if (modelsArray.length === grifo.appConfig.MAX_RESULTS_BLOG) {
          return modelsArray;
        }
      });
      return modelsArray;
    };

    return BlogCollection;

  })();

  FlickrCollection = (function() {

    __extends(FlickrCollection, Backbone.Collection);

    function FlickrCollection() {
      FlickrCollection.__super__.constructor.apply(this, arguments);
    }

    FlickrCollection.prototype.model = FlickrModel;

    FlickrCollection.prototype.parse = function(response_) {
      var isPortrait, itemDate, itemDescription, itemEntry, itemHeight, itemImage, itemModel, itemTitle, itemUrl, itemWidth, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['items'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        isPortrait = false;
        itemDescription = itemEntry['description'];
        if (itemDescription) {
          itemWidth = Utils.getWidth(itemDescription);
          itemHeight = Utils.getHeight(itemDescription);
          if (itemHeight > itemWidth) isPortrait = true;
        }
        itemTitle = itemEntry['title'];
        itemUrl = itemEntry['link'];
        itemImage = itemEntry['media']['m'].replace('_m.jpg', '.jpg');
        itemDate = Utils.relativeTime(itemEntry['published']);
        itemModel = new FlickrModel({
          title: itemTitle,
          url: itemUrl,
          image: itemImage,
          date: itemDate,
          is_portrait: isPortrait
        });
        modelsArray.push(itemModel);
        if (modelsArray.length === grifo.appConfig.MAX_RESULTS_FLICKR) {
          return modelsArray;
        }
      }
      return modelsArray;
    };

    FlickrCollection.prototype.parseAndAdd = function(response_) {
      return this.add(this.parse(response_));
    };

    return FlickrCollection;

  })();

  window.jsonFlickrFeed = function(data_) {
    grifo.flickrCollection.reset();
    return grifo.flickrCollection.parseAndAdd(data_);
  };

  GithubCollection = (function() {

    __extends(GithubCollection, Backbone.Collection);

    function GithubCollection() {
      GithubCollection.__super__.constructor.apply(this, arguments);
    }

    GithubCollection.prototype.model = GithubModel;

    GithubCollection.prototype.parse = function(response_) {
      var itemDate, itemEntry, itemModel, itemPublic, itemText, itemType, itemUrl, modelsArray, _i, _len;
      modelsArray = [];
      for (_i = 0, _len = response_.length; _i < _len; _i++) {
        itemEntry = response_[_i];
        itemPublic = itemEntry['public'];
        itemType = itemEntry['type'];
        itemDate = Utils.relativeTime(itemEntry['created_at']);
        itemUrl = itemEntry['url'];
        itemText = null;
        switch (itemType) {
          case 'PushEvent':
            if (itemEntry['repository']) {
              if (!itemEntry['repository']['private']) {
                itemText = 'pushed to <a target="_blank" href="' + itemUrl + '">' + itemEntry['repository']['name'] + '</a>';
              }
            }
            break;
          case 'WatchEvent':
            itemText = itemEntry['payload']['action'] + ' watching <a target="_blank" href="' + itemUrl + '">' + itemEntry['repository']['name'] + '</a>';
            break;
          case 'CreateEvent':
            if (itemEntry['repository']) {
              if (!itemEntry['repository']['private']) {
                itemText = 'created <a target="_blank" href="' + itemUrl + '">' + itemEntry['repository']['name'] + '</a>';
              }
            }
            break;
          case 'ForkEvent':
            if (itemEntry['repository']) {
              if (!itemEntry['repository']['private']) {
                itemText = 'forked <a target="_blank" href="' + itemUrl + '">' + itemEntry['repository']['name'] + '</a>';
              }
            }
            break;
          case 'FollowEvent':
            itemText = 'started following <a target="_blank" href="' + itemUrl + '">' + itemEntry['payload']['target']['login'] + '</a>';
        }
        /*
                        when 'CommitCommentEvent'
                            itemText = ''
                        when 'PullRequestEvent'
                            itemText = ''
                        when 'GistEvent'
                            itemText = ''
                        when 'DownloadEvent'
                            itemText = ''
                        when 'IssueCommentEvent'
                            itemText = ''
                        when 'GollumEvent'
                            itemText = ''
                        when 'DeleteEvent'
                            itemText = ''
                        when 'TeamAddEvent'
                            itemText = ''
                        when 'PublicEvent'
                            itemText = ''
                        when 'MemberEvent'
                            itemText = ''
                        when 'IssuesEvent'
                            itemText = ''
                        when 'ForkApplyEvent'
                            itemText = ''
                        when 'ForkApplyEvent'
                            itemText = ''
        */
        if (itemText) {
          itemModel = new GithubModel({
            type: itemType,
            text: itemText,
            date: itemDate,
            url: itemUrl
          });
          modelsArray.push(itemModel);
          if (modelsArray.length === grifo.appConfig.MAX_RESULTS_GITHUB) {
            return modelsArray;
          }
        }
      }
      return modelsArray;
    };

    return GithubCollection;

  })();

  TwitterCollection = (function() {

    __extends(TwitterCollection, Backbone.Collection);

    function TwitterCollection() {
      TwitterCollection.__super__.constructor.apply(this, arguments);
    }

    TwitterCollection.prototype.model = TwitterModel;

    TwitterCollection.prototype.parse = function(response_) {
      var iOf, itemDate, itemEntry, itemId, itemModel, itemText, itemTextComplete, itemUrl, modelsArray, _i, _len;
      modelsArray = [];
      for (_i = 0, _len = response_.length; _i < _len; _i++) {
        itemEntry = response_[_i];
        itemId = itemEntry['id_str'];
        itemText = itemEntry['text'];
        if (itemEntry['truncated'] && itemEntry['retweeted_status'] && itemEntry['retweeted_status']['text']) {
          itemTextComplete = itemEntry['retweeted_status']['text'];
          iOf = itemText.indexOf(itemTextComplete.substr(0, 20));
          if (iOf !== -1) itemText = itemText.substr(0, iOf) + itemTextComplete;
        }
        itemText = Utils.linkifyUrls(itemText);
        itemText = Utils.linkifyUsers(itemText);
        itemText = Utils.linkifyHashes(itemText);
        itemDate = Utils.relativeTime(itemEntry['created_at']);
        itemUrl = 'https://twitter.com/';
        itemUrl += itemEntry['user']['screen_name'];
        itemUrl += '/statuses/';
        itemUrl += itemEntry['id_str'];
        itemModel = new TwitterModel({
          id: itemId,
          text: itemText,
          date: itemDate,
          url: itemUrl
        });
        modelsArray.push(itemModel);
        if (modelsArray.length === grifo.appConfig.MAX_RESULTS_TWITTER) {
          return modelsArray;
        }
      }
      return modelsArray;
    };

    return TwitterCollection;

  })();

  YoutubeCollection = (function() {

    __extends(YoutubeCollection, Backbone.Collection);

    function YoutubeCollection() {
      YoutubeCollection.__super__.constructor.apply(this, arguments);
    }

    YoutubeCollection.prototype.model = YoutubeModel;

    YoutubeCollection.prototype.parse = function(response_) {
      var isPortrait, itemDate, itemEntry, itemId, itemModel, itemTags, itemUrl, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemDate = Utils.relativeTime(itemEntry['published']['$t']);
        itemUrl = itemEntry['id']['$t'];
        itemUrl = itemUrl.replace('http://gdata.youtube.com/feeds/api/videos/', 'http://www.youtube.com/watch?v=');
        itemId = itemUrl.replace('http://www.youtube.com/watch?v=', '');
        itemTags = itemEntry['media$group']['media$keywords']['$t'];
        isPortrait = false;
        if (itemTags.toLowerCase().indexOf('vertical') !== -1 || itemTags.toLowerCase().indexOf('v') !== -1 || itemTags.toLowerCase().indexOf('portrait') !== -1) {
          isPortrait = true;
        }
        itemModel = new YoutubeModel({
          id: itemId,
          url: itemUrl,
          date: itemDate,
          title: itemEntry['title']['$t'],
          content: itemEntry['content']['$t'],
          thumbnail_low: 'http://i.ytimg.com/vi/' + itemId + '/default.jpg',
          thumbnail_medium: 'http://i.ytimg.com/vi/' + itemId + '/hqdefault.jpg',
          is_portrait: isPortrait
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return YoutubeCollection;

  })();

  BrandCollection = (function() {

    __extends(BrandCollection, Backbone.Collection);

    function BrandCollection() {
      BrandCollection.__super__.constructor.apply(this, arguments);
    }

    BrandCollection.prototype.model = BrandModel;

    BrandCollection.prototype.comparator = function(model_) {
      return model_.get('priority') * 10.0 + (Math.random() * 10.0);
    };

    BrandCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new BrandModel({
          id: itemEntry['gsx$id']['$t'],
          label: itemEntry['gsx$label']['$t'],
          image: itemEntry['gsx$image']['$t'],
          url: itemEntry['gsx$url']['$t'],
          priority: itemEntry['gsx$priority']['$t']
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return BrandCollection;

  })();

  CreditCollection = (function() {

    __extends(CreditCollection, Backbone.Collection);

    function CreditCollection() {
      CreditCollection.__super__.constructor.apply(this, arguments);
    }

    CreditCollection.prototype.model = CreditModel;

    CreditCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new CreditModel({
          label: itemEntry['gsx$label']['$t'],
          profiles: itemEntry['gsx$profiles']['$t'].split(','),
          group: itemEntry['gsx$group']['$t']
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return CreditCollection;

  })();

  CreditGroupCollection = (function() {

    __extends(CreditGroupCollection, Backbone.Collection);

    function CreditGroupCollection() {
      CreditGroupCollection.__super__.constructor.apply(this, arguments);
    }

    CreditGroupCollection.prototype.model = CreditGroupModel;

    CreditGroupCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new CreditGroupModel({
          id: itemEntry['gsx$id']['$t'],
          label: itemEntry['gsx$label']['$t'],
          project: itemEntry['gsx$project']['$t']
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return CreditGroupCollection;

  })();

  ExperienceCollection = (function() {

    __extends(ExperienceCollection, Backbone.Collection);

    function ExperienceCollection() {
      ExperienceCollection.__super__.constructor.apply(this, arguments);
    }

    ExperienceCollection.prototype.model = ExperienceModel;

    ExperienceCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new ExperienceModel({
          left: itemEntry['gsx$left']['$t'],
          right: itemEntry['gsx$right']['$t'],
          plus_url: itemEntry['gsx$plusurl']['$t'],
          group: itemEntry['gsx$group']['$t']
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return ExperienceCollection;

  })();

  ExperienceGroupCollection = (function() {

    __extends(ExperienceGroupCollection, Backbone.Collection);

    function ExperienceGroupCollection() {
      ExperienceGroupCollection.__super__.constructor.apply(this, arguments);
    }

    ExperienceGroupCollection.prototype.model = ExperienceGroupModel;

    ExperienceGroupCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new ExperienceGroupModel({
          id: itemEntry['gsx$id']['$t'],
          label: itemEntry['gsx$label']['$t'],
          column: parseFloat(itemEntry['gsx$column']['$t'])
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return ExperienceGroupCollection;

  })();

  LabelCollection = (function() {

    __extends(LabelCollection, Backbone.Collection);

    function LabelCollection() {
      LabelCollection.__super__.constructor.apply(this, arguments);
    }

    LabelCollection.prototype.model = LabelModel;

    LabelCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new LabelModel({
          id: itemEntry['gsx$id']['$t'],
          label: itemEntry['gsx$label']['$t']
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return LabelCollection;

  })();

  ProfileCollection = (function() {

    __extends(ProfileCollection, Backbone.Collection);

    function ProfileCollection() {
      ProfileCollection.__super__.constructor.apply(this, arguments);
    }

    ProfileCollection.prototype.model = ProfileModel;

    ProfileCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new ProfileModel({
          id: itemEntry['gsx$id']['$t'],
          label: itemEntry['gsx$label']['$t'],
          url: itemEntry['gsx$url']['$t']
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return ProfileCollection;

  })();

  TagCollection = (function() {

    __extends(TagCollection, Backbone.Collection);

    function TagCollection() {
      TagCollection.__super__.constructor.apply(this, arguments);
    }

    TagCollection.prototype.model = TagModel;

    TagCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new TagModel({
          id: itemEntry['gsx$id']['$t'],
          short_title: itemEntry['gsx$shorttitle']['$t'],
          long_title: itemEntry['gsx$longtitle']['$t'],
          group: itemEntry['gsx$group']['$t']
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    TagCollection.prototype.select = function(id_) {
      var tagModel, _i, _len, _ref, _results;
      _ref = this.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagModel = _ref[_i];
        if (tagModel.get('id') === id_) {
          _results.push(tagModel.set({
            selected: true
          }));
        } else {
          _results.push(tagModel.set({
            selected: false
          }));
        }
      }
      return _results;
    };

    return TagCollection;

  })();

  ProjectCollection = (function() {

    __extends(ProjectCollection, Backbone.Collection);

    function ProjectCollection() {
      ProjectCollection.__super__.constructor.apply(this, arguments);
    }

    ProjectCollection.prototype.model = ProjectModel;

    ProjectCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new CreditGroupModel({
          id: itemEntry['gsx$id']['$t'],
          index: modelsArray.length,
          tile_size: itemEntry['gsx$tilesize']['$t'],
          short_title: itemEntry['gsx$shorttitle']['$t'],
          long_title: itemEntry['gsx$longtitle']['$t'],
          headline: itemEntry['gsx$headline']['$t'],
          thumbnail: itemEntry['gsx$thumbnail']['$t'],
          url: itemEntry['gsx$url']['$t'],
          video: itemEntry['gsx$video']['$t'],
          copy: itemEntry['gsx$copy']['$t'],
          images: itemEntry['gsx$images']['$t'].split(','),
          tags: itemEntry['gsx$tags']['$t'].split(','),
          display_tags: itemEntry['gsx$displaytags']['$t'].split(',')
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return ProjectCollection;

  })();

  TagGroupCollection = (function() {

    __extends(TagGroupCollection, Backbone.Collection);

    function TagGroupCollection() {
      TagGroupCollection.__super__.constructor.apply(this, arguments);
    }

    TagGroupCollection.prototype.model = TagGroupModel;

    TagGroupCollection.prototype.parse = function(response_) {
      var itemEntry, itemModel, modelsArray, _i, _len, _ref;
      modelsArray = [];
      _ref = response_['feed']['entry'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itemEntry = _ref[_i];
        itemModel = new TagGroupModel({
          id: itemEntry['gsx$id']['$t'],
          label: itemEntry['gsx$label']['$t']
        });
        modelsArray.push(itemModel);
      }
      return modelsArray;
    };

    return TagGroupCollection;

  })();

  AppView = (function() {

    __extends(AppView, Backbone.View);

    function AppView() {
      this.realign = __bind(this.realign, this);
      this.onHashChanged = __bind(this.onHashChanged, this);
      this.show = __bind(this.show, this);
      this.render = __bind(this.render, this);
      this.onLoad = __bind(this.onLoad, this);
      AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.EVENT_DATA_LOADED = 'EVENT_DATA_LOADED';

    AppView.EVENT_REALIGNED = 'EVENT_REALIGNED';

    AppView.prototype.el = 'body';

    AppView.prototype.$el = null;

    AppView.prototype.$window = null;

    AppView.prototype.template = null;

    AppView.prototype.loaded = 0.0;

    AppView.prototype.numLoaded = 15.0;

    AppView.prototype.headerView = null;

    AppView.prototype.headerBgView = null;

    AppView.prototype.tagsPageView = null;

    AppView.prototype.projectsPageView = null;

    AppView.prototype.projectPageView = null;

    AppView.prototype.streamPageView = null;

    AppView.prototype.aboutPageView = null;

    AppView.prototype.initialize = function() {
      this.$el = $(this.el);
      this.$window = $(window);
      this.template = _.template($('#template_app').html());
      this.$window.scroll(this.realign);
      this.$window.resize(this.realign);
      this.$window.load(this.onLoad);
      return this.loadData();
    };

    AppView.prototype.loadData = function() {
      var _this = this;
      grifo.projectCollection = new ProjectCollection;
      grifo.projectCollection.url = grifo.appConfig.URL_PROJECTS;
      grifo.projectCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.tagCollection = new TagCollection();
      grifo.tagCollection.url = grifo.appConfig.URL_TAGS;
      grifo.tagCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.tagGroupCollection = new TagGroupCollection();
      grifo.tagGroupCollection.url = grifo.appConfig.URL_TAG_GROUPS;
      grifo.tagGroupCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.creditCollection = new CreditCollection();
      grifo.creditCollection.url = grifo.appConfig.URL_CREDITS;
      grifo.creditCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.creditGroupCollection = new CreditGroupCollection();
      grifo.creditGroupCollection.url = grifo.appConfig.URL_CREDIT_GROUPS;
      grifo.creditGroupCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.experienceCollection = new ExperienceCollection();
      grifo.experienceCollection.url = grifo.appConfig.URL_EXPERIENCES;
      grifo.experienceCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.experienceGroupCollection = new ExperienceGroupCollection();
      grifo.experienceGroupCollection.url = grifo.appConfig.URL_EXPERIENCE_GROUPS;
      grifo.experienceGroupCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.profileCollection = new ProfileCollection();
      grifo.profileCollection.url = grifo.appConfig.URL_PROFILES;
      grifo.profileCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.brandCollection = new BrandCollection();
      grifo.brandCollection.url = grifo.appConfig.URL_BRANDS;
      grifo.brandCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.labelCollection = new LabelCollection();
      grifo.labelCollection.url = grifo.appConfig.URL_LABELS;
      grifo.labelCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.youtubeCollection = new YoutubeCollection();
      grifo.youtubeCollection.url = grifo.appConfig.URL_YOUTUBE;
      grifo.youtubeCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.twitterCollection = new TwitterCollection();
      grifo.twitterCollection.url = grifo.appConfig.URL_TWITTER;
      grifo.twitterCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.githubCollection = new GithubCollection();
      grifo.githubCollection.url = grifo.appConfig.URL_GITHUB;
      grifo.githubCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.flickrCollection = new FlickrCollection();
      grifo.flickrCollection.url = grifo.appConfig.URL_FLICKR;
      grifo.flickrCollection.fetch({
        success: function(model_, response_) {
          return _this.onLoad();
        },
        error: function(model_, response_) {
          return _this.onLoad();
        }
      });
      grifo.blogCollection = new BlogCollection();
      grifo.blogCollection.url = grifo.appConfig.URL_BLOG;
      return grifo.blogCollection.load();
    };

    AppView.prototype.onLoad = function() {
      this.loaded++;
      if (this.loaded === this.numLoaded) return this.onLoadComplete();
    };

    AppView.prototype.onLoadComplete = function() {
      this.render();
      this.show();
      return this.trigger(AppView.EVENT_DATA_LOADED);
    };

    AppView.prototype.render = function() {
      if (grifo.appState.isMobile) {
        $('#draw').remove();
        $('#paperJs').remove();
        $('#bgJs').remove();
      }
      this.$el.append(this.template({
        footer1_title: grifo.labelCollection.get('footer1-title').get('label'),
        footer1_copy: grifo.labelCollection.get('footer1-copy').get('label'),
        footer2_title: grifo.labelCollection.get('footer2-title').get('label'),
        footer2_copy: grifo.labelCollection.get('footer2-copy').get('label'),
        footer3_title: grifo.labelCollection.get('footer3-title').get('label'),
        footer3_copy: grifo.labelCollection.get('footer3-copy').get('label')
      }));
      this.headerView = new HeaderView();
      this.headerView.on(HeaderView.EVENT_ARROW_TOP_CLICKED, this.scrollToTop);
      this.headerBgView = new HeaderBgView();
      this.tagsPageView = new TagsPageView();
      this.projectsPageView = new ProjectsPageView();
      this.projectPageView = new ProjectPageView();
      this.streamPageView = new StreamPageView();
      this.aboutPageView = new AboutPageView();
      this.realign();
      return this;
    };

    AppView.prototype.show = function() {
      this.headerView.show();
      return this.headerBgView.show();
    };

    AppView.prototype.onHashChanged = function(id_, subId_, subSubId_) {
      var top;
      if (id_ === this.currentPage && subId_ === this.currentSubPage && subSubId_ === this.currentSubSubPage) {
        return;
      }
      grifo.appState.previousPage = grifo.appState.currentPage;
      grifo.appState.previousSubPage = grifo.appState.currentSubPage;
      grifo.appState.previousSubSubPage = grifo.appState.currentSubSubPage;
      grifo.appState.currentPage = id_;
      grifo.appState.currentSubPage = subId_;
      grifo.appState.currentSubSubPage = subSubId_;
      this.headerView.selectItem(id_);
      top = 0.0;
      switch (id_) {
        case grifo.appConfig.PAGE_PROJECTS:
          this.aboutPageView.hide();
          this.streamPageView.hide();
          grifo.tagCollection.select('');
          this.tagsPageView.hide();
          if (subId_) {
            this.projectsPageView.hide();
            this.projectPageView.show();
            top = grifo.appConfig.SNAP_Y_HEADER_BG + 29.0;
          } else {
            this.projectPageView.hide();
            this.projectsPageView.filter();
            this.projectsPageView.show();
          }
          break;
        case grifo.appConfig.PAGE_TAGS:
          this.aboutPageView.hide();
          this.projectPageView.hide();
          this.streamPageView.hide();
          this.projectsPageView.filter(subId_);
          this.projectsPageView.show();
          grifo.tagCollection.select(subId_);
          this.tagsPageView.show();
          if (subId_) top = grifo.appConfig.SNAP_Y_HEADER_BG;
          break;
        case grifo.appConfig.PAGE_STREAM:
          this.tagsPageView.hide();
          this.projectsPageView.hide();
          this.projectPageView.hide();
          this.aboutPageView.hide();
          this.streamPageView.show();
          break;
        case grifo.appConfig.PAGE_ABOUT:
          this.tagsPageView.hide();
          this.projectsPageView.hide();
          this.projectPageView.hide();
          this.streamPageView.hide();
          this.aboutPageView.show();
      }
      return this.scrollToTop(top);
    };

    AppView.prototype.scrollToTop = function(y_) {
      var difY;
      if (y_ == null) y_ = -10.0;
      difY = (y_ - window.pageYOffset) * 2.0;
      if (difY < 0) difY *= -1;
      if (difY > 1000) difY = 1000;
      return $('html,body').stop().animate({
        scrollTop: y_
      }, {
        duration: difY,
        easing: 'easeOutExpo'
      });
    };

    AppView.prototype.realign = function() {
      var headerBgOpacity, headerBgTop, headerLeftOpacity, headerTop, windowTop;
      if (!this.headerView || !this.headerBgView) return;
      windowTop = headerTop = headerBgTop = -this.$window.scrollTop();
      if (windowTop < -grifo.appConfig.SNAP_Y_HEADER_BG) {
        headerBgTop = -grifo.appConfig.SNAP_Y_HEADER_BG;
      }
      if (windowTop < -grifo.appConfig.SNAP_Y_HEADER) {
        headerTop = -grifo.appConfig.SNAP_Y_HEADER;
      }
      this.headerView.setTop(headerTop);
      this.headerBgView.setTop(headerBgTop);
      headerBgOpacity = headerBgTop / -grifo.appConfig.SNAP_Y_HEADER_BG;
      headerLeftOpacity = (headerTop - headerBgTop) / (grifo.appConfig.SNAP_Y_HEADER_BG - grifo.appConfig.SNAP_Y_HEADER);
      this.headerView.setLeftOpacity(headerLeftOpacity);
      this.headerBgView.setOpacity(headerBgOpacity);
      return this.trigger(AppView.EVENT_REALIGNED);
    };

    return AppView;

  })();

  AbstractView = (function() {

    __extends(AbstractView, Backbone.View);

    function AbstractView() {
      AbstractView.__super__.constructor.apply(this, arguments);
    }

    AbstractView.prototype.id = null;

    AbstractView.prototype.el = null;

    AbstractView.prototype.$el = null;

    AbstractView.prototype.status = true;

    AbstractView.prototype.hasTransition = true;

    AbstractView.prototype.initialize = function() {
      if (this.id) {
        this.$el = $('#' + this.id);
      } else {
        this.$el = $(this.el);
      }
      if (this.hasTransition) this.hide();
      return this.init();
    };

    AbstractView.prototype.remove = function() {
      return this.$el.remove();
    };

    AbstractView.prototype.removeChildren = function() {
      return this.$el.children().remove();
    };

    AbstractView.prototype.hide = function() {
      if (!this.hasTransition) return;
      this.status = false;
      this.$el.stop();
      return this.$el.css('display', 'none');
    };

    AbstractView.prototype.show = function(delay_, animate_) {
      if (delay_ == null) delay_ = 0.0;
      if (animate_ == null) animate_ = true;
      if (!this.hasTransition) return;
      this.status = true;
      this.$el.css('display', 'block');
      if (!animate_) {
        return this.$el.css('opacity', 1.0);
      } else {
        this.$el.css('opacity', 0.0);
        return this.$el.stop().delay(delay_).animate({
          opacity: 1.0
        }, {
          duration: 300.0
        });
      }
    };

    AbstractView.prototype.init = function() {};

    return AbstractView;

  })();

  TagView = (function() {

    __extends(TagView, AbstractView);

    function TagView() {
      this.onClick = __bind(this.onClick, this);
      this.remove = __bind(this.remove, this);
      this.render = __bind(this.render, this);
      TagView.__super__.constructor.apply(this, arguments);
    }

    TagView.prototype.useLongTitle = true;

    TagView.prototype.tagName = 'a';

    TagView.prototype.hasTransition = false;

    TagView.prototype.events = {
      'click': 'onClick'
    };

    TagView.prototype.init = function() {
      this.model.bind('change', this.render, this);
      return this.model.bind('destroy', this.remove, this);
    };

    TagView.prototype.render = function() {
      var label;
      if (this.useLongTitle) {
        label = this.model.get('long_title');
      } else {
        label = this.model.get('short_title');
      }
      if (this.model.get('selected')) {
        $(this.el).removeClass('tag');
        $(this.el).addClass('tagSelected');
      } else {
        $(this.el).addClass('tag');
        $(this.el).removeClass('tagSelected');
      }
      $(this.el).html(label);
      $(this.el).attr('href', '#');
      return this;
    };

    TagView.prototype.remove = function() {
      return $(this.el).remove();
    };

    TagView.prototype.onClick = function(e_) {
      e_.preventDefault();
      if (this.model.get('selected')) {
        return grifo.appRouter.navigateToTag();
      } else {
        return grifo.appRouter.navigateToTag(this.model.get('id'));
      }
    };

    return TagView;

  })();

  HeaderBgView = (function() {

    __extends(HeaderBgView, AbstractView);

    function HeaderBgView() {
      HeaderBgView.__super__.constructor.apply(this, arguments);
    }

    HeaderBgView.prototype.id = 'container-header-bg';

    HeaderBgView.prototype.setTop = function(value_) {
      return this.$el.css('top', value_);
    };

    HeaderBgView.prototype.setOpacity = function(value_) {
      return $('#header-bar-bg').css('opacity', value_);
    };

    return HeaderBgView;

  })();

  HeaderView = (function() {

    __extends(HeaderView, AbstractView);

    function HeaderView() {
      this.onArrowTopClick = __bind(this.onArrowTopClick, this);
      HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.EVENT_ARROW_TOP_CLICKED = 'EVENT_ARROW_TOP_CLICKED';

    HeaderView.prototype.id = 'container-header';

    HeaderView.prototype.navView = null;

    HeaderView.prototype.shareView = null;

    HeaderView.prototype.events = {
      'click #arrow-top': 'onArrowTopClick'
    };

    HeaderView.prototype.init = function() {
      this.navView = new NavView();
      return this.shareView = new ShareView();
    };

    HeaderView.prototype.onArrowTopClick = function(e_) {
      e_.preventDefault();
      return this.trigger(HeaderView.EVENT_ARROW_TOP_CLICKED);
    };

    HeaderView.prototype.selectItem = function(pageId_) {
      return this.navView.selectItem(pageId_);
    };

    HeaderView.prototype.setTop = function(value_) {
      return this.$el.css('top', value_);
    };

    HeaderView.prototype.setLeftOpacity = function(value_) {
      return $('#header-left').css('opacity', value_);
    };

    return HeaderView;

  })();

  NavView = (function() {

    __extends(NavView, AbstractView);

    function NavView() {
      NavView.__super__.constructor.apply(this, arguments);
    }

    NavView.prototype.id = 'nav';

    NavView.prototype.hasTransition = false;

    NavView.prototype.selectItem = function(pageId_) {
      if (pageId_ == null) pageId_ = '';
      $('.menu', this.$el).removeClass('menuSelected');
      return $('#menu-' + pageId_, this.$el).addClass('menuSelected');
    };

    return NavView;

  })();

  ShareView = (function() {

    __extends(ShareView, AbstractView);

    function ShareView() {
      this.onClick = __bind(this.onClick, this);
      ShareView.__super__.constructor.apply(this, arguments);
    }

    ShareView.prototype.id = 'header-right';

    ShareView.prototype.hasTransition = false;

    ShareView.prototype.init = function() {
      $('#share-twitter').click(this.onClick);
      return $('#share-facebook').click(this.onClick);
    };

    ShareView.prototype.onClick = function(e_) {
      var network, url;
      e_.preventDefault();
      network = $(e_.currentTarget).attr('id');
      switch (network) {
        case 'share-facebook':
          url = grifo.appConfig.SHARE_URL_FACEBOOK.replace('{URL}', encodeURIComponent(grifo.labelCollection.get('share-url').get('label')));
          break;
        case 'share-twitter':
          url = grifo.appConfig.SHARE_URL_TWITTER.replace('{TEXT}', encodeURIComponent(grifo.labelCollection.get('share-tweet').get('label')));
      }
      if (url) return window.open(url);
    };

    return ShareView;

  })();

  AbstractPageView = (function() {

    __extends(AbstractPageView, AbstractView);

    function AbstractPageView() {
      AbstractPageView.__super__.constructor.apply(this, arguments);
    }

    return AbstractPageView;

  })();

  AboutPageView = (function() {

    __extends(AboutPageView, AbstractPageView);

    function AboutPageView() {
      this.appendBrandView = __bind(this.appendBrandView, this);
      this.appendExperienceGroupView = __bind(this.appendExperienceGroupView, this);
      this.render = __bind(this.render, this);
      AboutPageView.__super__.constructor.apply(this, arguments);
    }

    AboutPageView.prototype.id = 'about-page';

    AboutPageView.prototype.overviewTemplate = null;

    AboutPageView.prototype.brandsTemplate = null;

    AboutPageView.prototype.itemList = null;

    AboutPageView.prototype.init = function() {
      this.itemList = [];
      this.overviewTemplate = _.template($('#template_overview').html());
      return this.brandsTemplate = _.template($('#template_brands').html());
    };

    AboutPageView.prototype.render = function() {
      var brandModel, experienceGroupModel, _i, _j, _len, _len2, _ref, _ref2;
      this.$el.append(this.overviewTemplate({
        label: grifo.labelCollection.get('about-overview').get('label'),
        image: grifo.labelCollection.get('about-picture').get('label'),
        headline: grifo.labelCollection.get('about-headline').get('label'),
        copy: grifo.labelCollection.get('about-copy').get('label')
      }));
      this.$el.append($('#template_experiences').html());
      _ref = grifo.experienceGroupCollection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        experienceGroupModel = _ref[_i];
        this.appendExperienceGroupView(experienceGroupModel);
      }
      this.$el.append(this.brandsTemplate({
        label: grifo.labelCollection.get('about-brands').get('label')
      }));
      grifo.brandCollection.sort();
      _ref2 = grifo.brandCollection.models;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        brandModel = _ref2[_j];
        this.appendBrandView(brandModel);
      }
      return this;
    };

    AboutPageView.prototype.appendExperienceGroupView = function(model_) {
      var experienceGroupView;
      if (model_.get('column') === 0.0) {
        $('#column-0', this.$el).append($('#template_experience_group_gap').html());
      } else {
        $('#column-1', this.$el).append($('#template_experience_group_gap').html());
      }
      experienceGroupView = new ExperienceGroupView({
        model: model_
      });
      if (model_.get('column') === 0.0) {
        $('#column-0', this.$el).append(experienceGroupView.render().el);
      } else {
        $('#column-1', this.$el).append(experienceGroupView.render().el);
      }
      return this.itemList[this.itemList.length] = experienceGroupView;
    };

    AboutPageView.prototype.appendBrandView = function(model_) {
      var brandView;
      brandView = new BrandView({
        model: model_
      });
      $('#brands', this.$el).append(brandView.render().el);
      return this.itemList[this.itemList.length] = brandView;
    };

    AboutPageView.prototype.show = function(delay_, animate_) {
      var itemView, _i, _len, _ref, _results;
      if (delay_ == null) delay_ = 0.0;
      if (animate_ == null) animate_ = true;
      this.itemList = [];
      this.removeChildren();
      this.render();
      AboutPageView.__super__.show.apply(this, arguments).show(delay_, animate_);
      delay_ += 50.0;
      if (this.itemList) {
        _ref = this.itemList;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          itemView = _ref[_i];
          itemView.show(delay_);
          _results.push(delay_ += 25.0);
        }
        return _results;
      }
    };

    AboutPageView.prototype.hide = function() {
      this.itemList = [];
      this.removeChildren();
      return AboutPageView.__super__.hide.apply(this, arguments).hide();
    };

    return AboutPageView;

  })();

  BrandView = (function() {

    __extends(BrandView, AbstractView);

    function BrandView() {
      this.render = __bind(this.render, this);
      BrandView.__super__.constructor.apply(this, arguments);
    }

    BrandView.prototype.className = 'brand';

    BrandView.prototype.render = function() {
      if (this.model.get('url').length > 0.0) {
        this.template = _.template($('#template_brand_link').html());
        $(this.el).append(this.template({
          image: this.model.get('image'),
          label: this.model.get('label'),
          url: this.model.get('url'),
          window: this.model.get('window')
        }));
      } else {
        this.template = _.template($('#template_brand').html());
        $(this.el).append(this.template({
          image: this.model.get('image'),
          label: this.model.get('label')
        }));
      }
      return this;
    };

    return BrandView;

  })();

  ExperienceGroupView = (function() {

    __extends(ExperienceGroupView, AbstractView);

    function ExperienceGroupView() {
      this.appendExperience = __bind(this.appendExperience, this);
      this.render = __bind(this.render, this);
      ExperienceGroupView.__super__.constructor.apply(this, arguments);
    }

    ExperienceGroupView.prototype.className = 'new-row';

    ExperienceGroupView.prototype.numLeftChar = 0.0;

    ExperienceGroupView.prototype.init = function() {
      this.template = _.template($('#template_experience_group').html());
      this.lineLeftTemplate = _.template($('#template_line_left').html());
      this.lineRightTemplate = _.template($('#template_line_right').html());
      this.lineRightPlusTemplate = _.template($('#template_line_right_plus').html());
      return this.lineGapTemplate = _.template($('#template_line_gap').html());
    };

    ExperienceGroupView.prototype.render = function() {
      var experienceModel, _i, _len, _ref;
      $(this.el).append(this.template({
        label: this.model.get('label')
      }));
      _ref = grifo.experienceCollection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        experienceModel = _ref[_i];
        if (experienceModel.get('group') === this.model.get('id')) {
          this.appendExperience(experienceModel);
        }
      }
      $('.inner-left', this.el).append(this.lineGapTemplate());
      $('.inner-left', this.el).append(this.lineGapTemplate());
      $('.inner-right', this.el).append(this.lineGapTemplate());
      $('.inner-right', this.el).append(this.lineGapTemplate());
      $('.inner-right', this.el).css('max-width', 478.0 - 29.0 - this.numLeftChar * 7.0);
      return this;
    };

    ExperienceGroupView.prototype.appendExperience = function(model_) {
      if (model_.get('left').split('<')[0].length > this.numLeftChar) {
        this.numLeftChar = model_.get('left').split('<')[0].length;
      }
      if (model_.get('left').length > 0.0) {
        $('.inner-left', this.el).append(this.lineLeftTemplate({
          label: model_.get('left')
        }));
      } else {
        $('.inner-left', this.el).append(this.lineGapTemplate());
      }
      if (model_.get('right').length > 0.0) {
        if (model_.get('plus_url').length > 0.0) {
          return $('.inner-right', this.el).append(this.lineRightPlusTemplate({
            label: model_.get('right'),
            url: model_.get('plus_url'),
            window: model_.get('window')
          }));
        } else {
          return $('.inner-right', this.el).append(this.lineRightTemplate({
            label: model_.get('right')
          }));
        }
      } else {
        return $('.inner-right', this.el).append(this.lineGapTemplate());
      }
    };

    return ExperienceGroupView;

  })();

  CreditGroupView = (function() {

    __extends(CreditGroupView, AbstractView);

    function CreditGroupView() {
      this.appendCreditView = __bind(this.appendCreditView, this);
      this.render = __bind(this.render, this);
      CreditGroupView.__super__.constructor.apply(this, arguments);
    }

    CreditGroupView.prototype.className = 'new-row';

    CreditGroupView.prototype.hasTransition = false;

    CreditGroupView.prototype.init = function() {
      return this.template = _.template($('#template_credit_group').html());
    };

    CreditGroupView.prototype.render = function() {
      var creditModel, _i, _len, _ref;
      $(this.el).append(this.template({
        label: this.model.get('label')
      }));
      _ref = grifo.creditCollection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        creditModel = _ref[_i];
        if (creditModel.get('group') === this.model.get('id')) {
          this.appendCreditView(creditModel);
        }
      }
      return this;
    };

    CreditGroupView.prototype.appendCreditView = function(model_) {
      var creditView;
      creditView = new CreditView({
        model: model_
      });
      return $($('.date', this.el)[0]).append(creditView.render().el);
    };

    return CreditGroupView;

  })();

  CreditView = (function() {

    __extends(CreditView, AbstractView);

    function CreditView() {
      this.appendProfileView = __bind(this.appendProfileView, this);
      this.render = __bind(this.render, this);
      CreditView.__super__.constructor.apply(this, arguments);
    }

    CreditView.prototype.tagName = 'p';

    CreditView.prototype.hasTransition = false;

    CreditView.prototype.init = function() {
      return this.template = _.template($('#template_credit').html());
    };

    CreditView.prototype.render = function() {
      var i, l, profileId, profileModel, _i, _len, _ref;
      if (this.model.get('label').length > 0) {
        $(this.el).append(this.template({
          label: this.model.get('label')
        }));
      }
      i = 0.0;
      l = this.model.get('profiles').length;
      _ref = this.model.get('profiles');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        profileId = _ref[_i];
        profileModel = grifo.profileCollection.get(profileId);
        this.appendProfileView(profileModel);
        i++;
        if (i < l) $(this.el).append(', ');
      }
      return this;
    };

    CreditView.prototype.appendProfileView = function(model_) {
      var profileView;
      profileView = new ProfileView({
        model: model_
      });
      return $(this.el).append(profileView.render().el);
    };

    return CreditView;

  })();

  ProfileView = (function() {

    __extends(ProfileView, AbstractView);

    function ProfileView() {
      this.render = __bind(this.render, this);
      ProfileView.__super__.constructor.apply(this, arguments);
    }

    ProfileView.prototype.tagName = 'a';

    ProfileView.prototype.hasTransition = false;

    ProfileView.prototype.render = function() {
      $(this.el).html(this.model.get('label'));
      $(this.el).attr('href', this.model.get('url'));
      $(this.el).attr('target', this.model.get('window'));
      return this;
    };

    return ProfileView;

  })();

  ProjectPageView = (function() {

    __extends(ProjectPageView, AbstractPageView);

    function ProjectPageView() {
      this.appendProjectImage = __bind(this.appendProjectImage, this);
      this.appendCreditGroupView = __bind(this.appendCreditGroupView, this);
      this.appendTagView = __bind(this.appendTagView, this);
      this.render = __bind(this.render, this);
      ProjectPageView.__super__.constructor.apply(this, arguments);
    }

    ProjectPageView.prototype.id = 'project-page';

    ProjectPageView.prototype.model = null;

    ProjectPageView.prototype.template = null;

    ProjectPageView.prototype.imgTemplate = null;

    ProjectPageView.prototype.init = function() {
      this.template = _.template($('#template_page_project').html());
      return this.imgTemplate = _.template($('#template_project_image').html());
    };

    ProjectPageView.prototype.render = function() {
      var creditGroupModel, imageModel, nextModel, prevModel, tagId, tagModel, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
      this.model = grifo.projectCollection.get(grifo.appState.currentSubPage);
      prevModel = grifo.projectCollection.at(this.model.get('index') - 1.0);
      nextModel = grifo.projectCollection.at(this.model.get('index') + 1.0);
      if (!prevModel) {
        prevModel = grifo.projectCollection.at(grifo.projectCollection.length - 1.0);
      }
      if (!nextModel) nextModel = grifo.projectCollection.at(0.0);
      this.$el.append(this.template({
        video: this.model.get('video'),
        title: this.model.get('long_title'),
        headline: this.model.get('headline'),
        url: this.model.get('url'),
        copy: this.model.get('copy'),
        showArrows: grifo.appState.isDesktop,
        prevUrl: '#/' + grifo.appConfig.PAGE_PROJECTS + '/' + prevModel.get('id') + '/',
        prevTitle: prevModel.get('long_title'),
        nextUrl: '#/' + grifo.appConfig.PAGE_PROJECTS + '/' + nextModel.get('id') + '/',
        nextTitle: nextModel.get('long_title')
      }));
      _ref = this.model.get('tags');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagId = _ref[_i];
        tagModel = grifo.tagCollection.get(tagId);
        this.appendTagView(tagModel);
      }
      _ref2 = grifo.creditGroupCollection.models;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        creditGroupModel = _ref2[_j];
        if (creditGroupModel.get('project') === this.model.get('id')) {
          this.appendCreditGroupView(creditGroupModel);
        }
      }
      _ref3 = this.model.get('images');
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        imageModel = _ref3[_k];
        this.appendProjectImage(imageModel);
      }
      return this;
    };

    ProjectPageView.prototype.appendTagView = function(model_) {
      var tagView;
      tagView = new TagView({
        model: model_
      });
      $('#tags-container', this.$el).append(tagView.render().el);
      return $('#tags-container', this.$el).append(' ');
    };

    ProjectPageView.prototype.appendCreditGroupView = function(model_) {
      var creditGroupView;
      creditGroupView = new CreditGroupView({
        model: model_
      });
      return $('#info-right', this.$el).append(creditGroupView.render().el);
    };

    ProjectPageView.prototype.appendProjectImage = function(src_) {
      return $('#images-container', this.$el).append(this.imgTemplate({
        image: src_
      }));
    };

    ProjectPageView.prototype.show = function(delay_, animate_) {
      if (delay_ == null) delay_ = 100.0;
      if (animate_ == null) animate_ = true;
      this.removeChildren();
      this.render();
      return ProjectPageView.__super__.show.apply(this, arguments).show(delay_, animate_);
    };

    ProjectPageView.prototype.hide = function() {
      this.removeChildren();
      return ProjectPageView.__super__.hide.apply(this, arguments).hide();
    };

    return ProjectPageView;

  })();

  ProjectsPageView = (function() {

    __extends(ProjectsPageView, AbstractPageView);

    function ProjectsPageView() {
      this.appendThumbnail = __bind(this.appendThumbnail, this);
      this.render = __bind(this.render, this);
      ProjectsPageView.__super__.constructor.apply(this, arguments);
    }

    ProjectsPageView.prototype.id = 'projects-page';

    ProjectsPageView.prototype.itemList = null;

    ProjectsPageView.prototype.init = function() {
      this.itemList = [];
      return this.render();
    };

    ProjectsPageView.prototype.render = function() {
      var projectModel, _i, _len, _ref;
      _ref = grifo.projectCollection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        projectModel = _ref[_i];
        this.appendThumbnail(projectModel);
      }
      this.$el.isotope({
        itemSelector: '.grid-item',
        resizable: false,
        masonry: {
          columnWidth: 1
        },
        animationEngine: 'jquery',
        animationOptions: {
          queue: false,
          duration: 0.0,
          easing: 'easeOutExpo'
        }
      });
      return this;
    };

    ProjectsPageView.prototype.relayout = function() {
      return this.$el.isotope('reLayout');
    };

    ProjectsPageView.prototype.appendThumbnail = function(model_) {
      var thumbnailView;
      thumbnailView = new ThumbnailView({
        model: model_
      });
      this.$el.append(thumbnailView.render().el);
      return this.itemList[this.itemList.length] = thumbnailView;
    };

    ProjectsPageView.prototype.filter = function(tagId_) {
      if (tagId_ == null) tagId_ = '';
      if (tagId_ === '') {
        tagId_ = '*';
      } else {
        tagId_ = '.' + tagId_;
      }
      if (!this.status) {
        this.$el.isotope({
          animationOptions: {
            duration: 0.0
          }
        });
      } else {
        this.$el.isotope({
          animationOptions: {
            duration: 750.0
          }
        });
      }
      return this.$el.isotope({
        filter: tagId_
      });
    };

    ProjectsPageView.prototype.show = function(delay_, animate_) {
      var thumbnailStatus, thumbnailView, _i, _len, _ref, _results;
      if (delay_ == null) delay_ = 0.0;
      if (animate_ == null) animate_ = false;
      if (this.status === true) return;
      ProjectsPageView.__super__.show.apply(this, arguments).show(delay_, animate_);
      delay_ += 100;
      this.relayout();
      if (this.itemList) {
        _ref = this.itemList;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          thumbnailView = _ref[_i];
          thumbnailStatus = thumbnailView.show(delay_);
          if (thumbnailStatus) {
            _results.push(delay_ += 50.0);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    ProjectsPageView.prototype.hide = function() {
      if (this.status === false) return;
      this.status = false;
      /*
              if @itemList
                  for thumbnailView in @itemList
                      thumbnailView.hide()
      */
      return ProjectsPageView.__super__.hide.apply(this, arguments).hide();
    };

    return ProjectsPageView;

  })();

  ThumbnailView = (function() {

    __extends(ThumbnailView, AbstractView);

    function ThumbnailView() {
      this.onRollOut = __bind(this.onRollOut, this);
      this.onRollOver = __bind(this.onRollOver, this);
      this.onClick = __bind(this.onClick, this);
      this.appendTagView = __bind(this.appendTagView, this);
      this.render = __bind(this.render, this);
      ThumbnailView.__super__.constructor.apply(this, arguments);
    }

    ThumbnailView.prototype.className = 'grid-item';

    ThumbnailView.prototype.template = null;

    ThumbnailView.prototype.model = null;

    ThumbnailView.prototype.events = {
      'click .grid-item-image': 'onClick',
      'click .grid-item-name': 'onClick',
      'click .grid-item-over': 'onClick',
      'mouseenter': 'onRollOver',
      'mouseleave': 'onRollOut'
    };

    ThumbnailView.prototype.init = function() {
      return this.template = _.template($('#template_thumbnail').html());
    };

    ThumbnailView.prototype.render = function() {
      var tagId, tagModel, _i, _len, _ref;
      this.$el.addClass(this.model.get('tile_size'));
      this.$el.addClass(this.model.get('tags').join(' '));
      this.$el.append(this.template({
        image: this.model.get('thumbnail'),
        title: this.model.get('short_title')
      }));
      $('.grid-item-image', this.$el).addClass(this.model.get('tile_size'));
      $('.grid-item-over', this.$el).addClass(this.model.get('tile_size'));
      $('.grid-item-over', this.$el).css('opacity', 0.0);
      _ref = this.model.get('display_tags');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagId = _ref[_i];
        tagModel = grifo.tagCollection.get(tagId);
        this.appendTagView(tagModel);
      }
      return this;
    };

    ThumbnailView.prototype.appendTagView = function(model_) {
      var tagView;
      tagView = new TagView({
        model: model_
      });
      tagView.useLongTitle = false;
      $('.grid-item-tags', this.$el).append(tagView.render().el);
      return $('.grid-item-tags', this.$el).append(' ');
    };

    ThumbnailView.prototype.show = function(delay_, animate_) {
      if (delay_ == null) delay_ = 0.0;
      if (animate_ == null) animate_ = true;
      ThumbnailView.__super__.show.apply(this, arguments).show(delay_, animate_);
      return this.$el.attr('class').indexOf('isotope-hidden') === -1;
    };

    ThumbnailView.prototype.onClick = function(e_) {
      e_.preventDefault();
      return grifo.appRouter.navigateToProject(this.model.get('id'));
    };

    ThumbnailView.prototype.onRollOver = function(e_) {
      $('.grid-item-over', this.$el).stop().animate({
        opacity: 0.2
      }, 200);
      return $('.grid-item-name', this.$el).addClass('over');
    };

    ThumbnailView.prototype.onRollOut = function(e_) {
      $('.grid-item-over', this.$el).stop().animate({
        opacity: 0.0
      }, 200);
      return $('.grid-item-name', this.$el).removeClass('over');
    };

    return ThumbnailView;

  })();

  BlogView = (function() {

    __extends(BlogView, AbstractView);

    function BlogView() {
      this.render = __bind(this.render, this);
      BlogView.__super__.constructor.apply(this, arguments);
    }

    BlogView.prototype.className = 'word-stream-item size1of3';

    BlogView.prototype.template = null;

    BlogView.prototype.init = function() {
      return this.template = _.template($('#template_blog').html());
    };

    BlogView.prototype.render = function() {
      $(this.el).append(this.template({
        title: this.model.get('title'),
        description: this.model.get('description'),
        date: this.model.get('date'),
        url: this.model.get('url')
      }));
      return this;
    };

    return BlogView;

  })();

  FlickrView = (function() {

    __extends(FlickrView, AbstractView);

    function FlickrView() {
      this.render = __bind(this.render, this);
      FlickrView.__super__.constructor.apply(this, arguments);
    }

    FlickrView.prototype.className = 'media-stream-item size1of3';

    FlickrView.prototype.template = null;

    FlickrView.prototype.init = function() {
      if (this.model.get('is_portrait')) {
        return this.template = _.template($('#template_flickr_portrait').html());
      } else {
        return this.template = _.template($('#template_flickr_landscape').html());
      }
    };

    FlickrView.prototype.render = function() {
      $(this.el).append(this.template({
        image: this.model.get('image'),
        date: this.model.get('date'),
        url: this.model.get('url')
      }));
      return this;
    };

    return FlickrView;

  })();

  GithubView = (function() {

    __extends(GithubView, AbstractView);

    function GithubView() {
      this.render = __bind(this.render, this);
      GithubView.__super__.constructor.apply(this, arguments);
    }

    GithubView.prototype.className = 'word-stream-item size1of3';

    GithubView.prototype.template = null;

    GithubView.prototype.init = function() {
      return this.template = _.template($('#template_github').html());
    };

    GithubView.prototype.render = function() {
      $(this.el).append(this.template({
        label: this.model.get('text'),
        date: this.model.get('date'),
        url: this.model.get('url')
      }));
      return this;
    };

    return GithubView;

  })();

  StreamPageView = (function() {

    __extends(StreamPageView, AbstractPageView);

    function StreamPageView() {
      this.appendFlickrView = __bind(this.appendFlickrView, this);
      this.appendYoutubeView = __bind(this.appendYoutubeView, this);
      this.appendBlogView = __bind(this.appendBlogView, this);
      this.appendGithubView = __bind(this.appendGithubView, this);
      this.appendTwitterView = __bind(this.appendTwitterView, this);
      this.appendWordLine = __bind(this.appendWordLine, this);
      this.render = __bind(this.render, this);
      StreamPageView.__super__.constructor.apply(this, arguments);
    }

    StreamPageView.prototype.id = 'stream-page';

    StreamPageView.prototype.template = null;

    StreamPageView.prototype.wordItemList = null;

    StreamPageView.prototype.mediaItemList = null;

    StreamPageView.prototype.init = function() {
      this.wordItemList = [];
      this.mediaItemList = [];
      return this.template = _.template($('#template_page_stream').html());
    };

    StreamPageView.prototype.render = function() {
      var addLine, count, i, l, round;
      this.$el.append(this.template({
        label: grifo.labelCollection.get('stream-title').get('label')
      }));
      i = 0.0;
      l = grifo.twitterCollection.length + grifo.githubCollection.length + grifo.blogCollection.length;
      count = 0.0;
      round = 0.0;
      while (i < l) {
        addLine = true;
        switch (count) {
          case 0.0:
            if (round < grifo.twitterCollection.length) {
              this.appendTwitterView(grifo.twitterCollection.at(round));
            } else {
              addLine = false;
              i--;
            }
            break;
          case 1.0:
            if (round < grifo.githubCollection.length) {
              this.appendGithubView(grifo.githubCollection.at(round));
            } else {
              addLine = false;
              i--;
            }
            break;
          case 2.0:
            if (round < grifo.blogCollection.length) {
              this.appendBlogView(grifo.blogCollection.at(round));
            } else {
              addLine = false;
              i--;
            }
        }
        count++;
        if (count === 3.0) {
          count = 0.0;
          round++;
        }
        i++;
        if (addLine && i < l) this.appendWordLine();
      }
      i = 0.0;
      l = grifo.youtubeCollection.length + grifo.flickrCollection.length;
      count = 0.0;
      round = 0.0;
      while (i < l) {
        switch (count) {
          case 0.0:
            if (round < grifo.youtubeCollection.length) {
              this.appendYoutubeView(grifo.youtubeCollection.at(round));
            } else {
              i--;
            }
            break;
          case 1.0:
            if (round < grifo.flickrCollection.length) {
              this.appendFlickrView(grifo.flickrCollection.at(round));
            } else {
              i--;
            }
        }
        count++;
        if (count === 2.0) {
          count = 0.0;
          round++;
        }
        i++;
      }
      $('#media-grid', this.$el).isotope({
        itemSelector: '.media-stream-item',
        resizable: 'false',
        masonry: {
          columnWidth: 1
        },
        animationEngine: 'jquery',
        animationOptions: {
          queue: false,
          duration: 0,
          easing: 'easeOutExpo'
        }
      });
      return this;
    };

    StreamPageView.prototype.appendWordLine = function() {
      var wordLineView;
      wordLineView = new WordStreamLineView();
      $('#word-grid', this.$el).append(wordLineView.render().el);
      return this.wordItemList[this.wordItemList.length] = wordLineView;
    };

    StreamPageView.prototype.appendTwitterView = function(model_) {
      var twitterView;
      twitterView = new TwitterView({
        model: model_
      });
      $('#word-grid', this.$el).append(twitterView.render().el);
      return this.wordItemList[this.wordItemList.length] = twitterView;
    };

    StreamPageView.prototype.appendGithubView = function(model_) {
      var githubView;
      githubView = new GithubView({
        model: model_
      });
      $('#word-grid', this.$el).append(githubView.render().el);
      return this.wordItemList[this.wordItemList.length] = githubView;
    };

    StreamPageView.prototype.appendBlogView = function(model_) {
      var blogView;
      blogView = new BlogView({
        model: model_
      });
      $('#word-grid', this.$el).append(blogView.render().el);
      return this.wordItemList[this.wordItemList.length] = blogView;
    };

    StreamPageView.prototype.appendYoutubeView = function(model_) {
      var youtubeView;
      youtubeView = new YoutubeView({
        model: model_
      });
      $('#media-grid', this.$el).append(youtubeView.render().el);
      return this.mediaItemList[this.mediaItemList.length] = youtubeView;
    };

    StreamPageView.prototype.appendFlickrView = function(model_) {
      var flickrView;
      flickrView = new FlickrView({
        model: model_
      });
      $('#media-grid', this.$el).append(flickrView.render().el);
      return this.mediaItemList[this.mediaItemList.length] = flickrView;
    };

    StreamPageView.prototype.show = function(delay_, animate_) {
      var mediaItemView, wordItemView, _i, _j, _len, _len2, _ref, _ref2, _results;
      if (delay_ == null) delay_ = 0.0;
      if (animate_ == null) animate_ = true;
      this.wordItemList = [];
      this.mediaItemList = [];
      this.removeChildren();
      StreamPageView.__super__.show.apply(this, arguments).show(delay_, animate_);
      this.render();
      if (this.wordItemList) {
        _ref = this.wordItemList;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          wordItemView = _ref[_i];
          wordItemView.show(delay_);
          delay_ += 25.0;
        }
      }
      delay_ = 0.0;
      if (this.mediaItemList) {
        _ref2 = this.mediaItemList;
        _results = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          mediaItemView = _ref2[_j];
          mediaItemView.show(delay_);
          _results.push(delay_ += 50.0);
        }
        return _results;
      }
    };

    StreamPageView.prototype.hide = function() {
      this.wordItemList = [];
      this.mediaItemList = [];
      this.removeChildren();
      return StreamPageView.__super__.hide.apply(this, arguments).hide();
    };

    return StreamPageView;

  })();

  TwitterView = (function() {

    __extends(TwitterView, AbstractView);

    function TwitterView() {
      this.render = __bind(this.render, this);
      TwitterView.__super__.constructor.apply(this, arguments);
    }

    TwitterView.prototype.className = 'word-stream-item size1of3';

    TwitterView.prototype.template = null;

    TwitterView.prototype.init = function() {
      return this.template = _.template($('#template_twitter').html());
    };

    TwitterView.prototype.render = function() {
      $(this.el).append(this.template({
        label: this.model.get('text'),
        date: this.model.get('date'),
        url: this.model.get('url')
      }));
      return this;
    };

    return TwitterView;

  })();

  WordStreamLineView = (function() {

    __extends(WordStreamLineView, AbstractView);

    function WordStreamLineView() {
      this.render = __bind(this.render, this);
      WordStreamLineView.__super__.constructor.apply(this, arguments);
    }

    WordStreamLineView.prototype.className = 'word-stream-line size1of3';

    WordStreamLineView.prototype.render = function() {
      return this;
    };

    return WordStreamLineView;

  })();

  YoutubeView = (function() {

    __extends(YoutubeView, AbstractView);

    function YoutubeView() {
      this.render = __bind(this.render, this);
      YoutubeView.__super__.constructor.apply(this, arguments);
    }

    YoutubeView.prototype.className = 'media-stream-item size1of3';

    YoutubeView.prototype.template = null;

    YoutubeView.prototype.init = function() {
      if (this.model.get('is_portrait')) {
        return this.template = _.template($('#template_youtube_portrait').html());
      } else {
        return this.template = _.template($('#template_youtube_landscape').html());
      }
    };

    YoutubeView.prototype.render = function() {
      $(this.el).append(this.template({
        id: this.model.get('id'),
        image: this.model.get('thumbnail_medium'),
        date: this.model.get('date'),
        url: this.model.get('url')
      }));
      return this;
    };

    return YoutubeView;

  })();

  TagGroupView = (function() {

    __extends(TagGroupView, AbstractView);

    function TagGroupView() {
      this.appendTagView = __bind(this.appendTagView, this);
      this.render = __bind(this.render, this);
      TagGroupView.__super__.constructor.apply(this, arguments);
    }

    TagGroupView.prototype.className = 'size1of6';

    TagGroupView.prototype.template = null;

    TagGroupView.prototype.model = null;

    TagGroupView.prototype.init = function() {
      return this.template = _.template($('#template_tag_group').html());
    };

    TagGroupView.prototype.render = function() {
      var tagModel, _i, _len, _ref;
      this.$el.append(this.template({
        group: this.model.get('label')
      }));
      _ref = grifo.tagCollection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagModel = _ref[_i];
        if (tagModel.get('group') === this.model.get('id')) {
          this.appendTagView(tagModel);
        }
      }
      return this;
    };

    TagGroupView.prototype.appendTagView = function(model_) {
      var tagView;
      tagView = new TagView({
        model: model_
      });
      tagView.useLongTitle = true;
      this.$el.append(tagView.render().el);
      return this.$el.append(' ');
    };

    return TagGroupView;

  })();

  TagsPageView = (function() {

    __extends(TagsPageView, AbstractPageView);

    function TagsPageView() {
      this.appendTagGroup = __bind(this.appendTagGroup, this);
      this.render = __bind(this.render, this);
      TagsPageView.__super__.constructor.apply(this, arguments);
    }

    TagsPageView.prototype.id = 'tags-page';

    TagsPageView.prototype.itemList = null;

    TagsPageView.prototype.init = function() {
      this.itemList = [];
      return this.render();
    };

    TagsPageView.prototype.render = function() {
      var tagGroupModel, _i, _len, _ref;
      _ref = grifo.tagGroupCollection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagGroupModel = _ref[_i];
        this.appendTagGroup(tagGroupModel);
      }
      this.$el.append('<div class="new-row"><br/><hr/></div>');
      return this;
    };

    TagsPageView.prototype.appendTagGroup = function(model_) {
      var tagGroupView;
      tagGroupView = new TagGroupView({
        model: model_
      });
      this.$el.append(tagGroupView.render().el);
      return this.itemList[this.itemList.length] = tagGroupView;
    };

    TagsPageView.prototype.show = function(delay_, animate_) {
      var tagGroupView, _i, _len, _ref, _results;
      if (delay_ == null) delay_ = 0.0;
      if (animate_ == null) animate_ = true;
      if (this.status === true) return;
      TagsPageView.__super__.show.apply(this, arguments).show(delay_, animate_);
      if (this.itemList) {
        _ref = this.itemList;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tagGroupView = _ref[_i];
          tagGroupView.show(delay_);
          _results.push(delay_ += 50.0);
        }
        return _results;
      }
    };

    return TagsPageView;

  })();

}).call(this);
