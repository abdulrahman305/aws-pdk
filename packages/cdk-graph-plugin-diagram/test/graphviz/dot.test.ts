/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import * as path from "path";
import { CdkGraph } from "@aws-prototyping-sdk/cdk-graph";
import {
  FixtureApp,
  MultiFixtureApp,
  StagedApp,
} from "@aws-prototyping-sdk/cdk-graph/test/__fixtures__/apps";
import * as fs from "fs-extra";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import sharp = require("sharp"); // eslint-disable-line @typescript-eslint/no-require-imports
import { CdkGraphDiagramPlugin } from "../../src";

jest.setTimeout(30000);

expect.extend({ toMatchImageSnapshot });

async function getCdkOutDir(name: string): Promise<string> {
  const dir = path.join(__dirname, "..", ".tmp", "dot", name, "cdk.out");

  await fs.ensureDir(dir);
  await fs.emptyDir(dir);

  return dir;
}

describe("dot", () => {
  describe("single-stack-app", () => {
    let outdir: string;
    let app: FixtureApp;
    let graph: CdkGraph;
    let plugin: CdkGraphDiagramPlugin;

    beforeAll(async () => {
      outdir = await getCdkOutDir("single-stack-app");

      app = new FixtureApp({ outdir });
      plugin = new CdkGraphDiagramPlugin();
      graph = new CdkGraph(app, {
        plugins: [plugin],
      });
      app.synth();
      await graph.report();
    });

    it("should generate dot artifact", async () => {
      expect(plugin.defaultDotArtifact).toBeDefined();
      expect(
        await fs.pathExists(plugin.defaultDotArtifact!.filepath)
      ).toBeTruthy();
      expect(
        await fs.readFile(plugin.defaultDotArtifact!.filepath, {
          encoding: "utf-8",
        })
      ).toMatchSnapshot();
    });

    it("should generate png artifact", async () => {
      expect(plugin.defaultPngArtifact).toBeDefined();
      expect(
        await fs.pathExists(plugin.defaultPngArtifact!.filepath)
      ).toBeTruthy();
      expect(
        await sharp(plugin.defaultPngArtifact!.filepath).toBuffer()
      ).toMatchImageSnapshot();
    });
  });

  describe("multi-stack-app", () => {
    let outdir: string;
    let app: MultiFixtureApp;
    let graph: CdkGraph;
    let plugin: CdkGraphDiagramPlugin;

    beforeAll(async () => {
      outdir = await getCdkOutDir("multi-stack-app");

      app = new MultiFixtureApp({ outdir });
      plugin = new CdkGraphDiagramPlugin();
      graph = new CdkGraph(app, {
        plugins: [plugin],
      });
      app.synth();
      await graph.report();
    });

    it("should generate dot artifact", async () => {
      expect(plugin.defaultDotArtifact).toBeDefined();
      expect(
        await fs.pathExists(plugin.defaultDotArtifact!.filepath)
      ).toBeTruthy();
      expect(
        await fs.readFile(plugin.defaultDotArtifact!.filepath, {
          encoding: "utf-8",
        })
      ).toMatchSnapshot();
    });

    it("should generate png artifact", async () => {
      expect(plugin.defaultPngArtifact).toBeDefined();
      expect(
        await fs.pathExists(plugin.defaultPngArtifact!.filepath)
      ).toBeTruthy();
      expect(
        await sharp(plugin.defaultPngArtifact!.filepath).toBuffer()
      ).toMatchImageSnapshot();
    });
  });

  describe("staged-app", () => {
    let outdir: string;
    let app: StagedApp;
    let graph: CdkGraph;
    let plugin: CdkGraphDiagramPlugin;

    beforeAll(async () => {
      outdir = await getCdkOutDir("staged-app");

      app = new StagedApp({ outdir });
      plugin = new CdkGraphDiagramPlugin();
      graph = new CdkGraph(app, {
        plugins: [plugin],
      });
      app.synth();
      await graph.report();
    });

    it("should generate dot artifact", async () => {
      expect(plugin.defaultDotArtifact).toBeDefined();
      expect(
        await fs.pathExists(plugin.defaultDotArtifact!.filepath)
      ).toBeTruthy();
      expect(
        await fs.readFile(plugin.defaultDotArtifact!.filepath, {
          encoding: "utf-8",
        })
      ).toMatchSnapshot();
    });

    it("should generate png artifact", async () => {
      expect(plugin.defaultPngArtifact).toBeDefined();
      expect(
        await fs.pathExists(plugin.defaultPngArtifact!.filepath)
      ).toBeTruthy();
      expect(
        await sharp(plugin.defaultPngArtifact!.filepath).toBuffer()
      ).toMatchImageSnapshot();
    });
  });
});
